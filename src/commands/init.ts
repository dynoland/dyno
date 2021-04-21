import { CliffyPromptSelect } from "../../deps.ts";
import {
  checkDynoFile,
  checkVSCodeFile,
  getVSCodeFile,
  saveDynoMapFile,
  saveVSCodeFile,
} from "../utils/files.ts";
import { fail, succeed, warn } from "../utils/logger.ts";

async function init(): Promise<void> {
  const dynoFileExists = await checkDynoFile();

  if (!dynoFileExists) {
    try {
      await saveDynoMapFile({
        scripts: {},
        dependencies: {},
      });
      succeed("Created dyno.json file");
    } catch (error) {
      if (error instanceof Deno.errors.PermissionDenied) {
        fail("Dyno not have correct permissions to run, please reinstall.");
      } else {
        console.error(error.message);
      }
    }
  } else {
    warn("Dyno file dyno.json already exists");
  }

  const vscodeFileExists = await checkVSCodeFile();

  const vscodeExists: boolean = vscodeFileExists ||
    (await CliffyPromptSelect.Select.prompt({
        message: "You're using Visual Studio Code?",
        options: [
          { name: "Yes", value: "true" },
          { name: "No", value: "false" },
        ],
      })) === "true";

  if (vscodeExists) {
    let vscode = {};

    if (vscodeFileExists) {
      vscode = await getVSCodeFile();
    }

    vscode = {
      ...vscode,
      "deno.importMap": "./dyno_map.json",
    };

    try {
      await saveVSCodeFile(vscode);
      succeed("Updated Visual Studio Code file");
    } catch (error) {
      if (error instanceof Deno.errors.PermissionDenied) {
        fail("Dyno not have correct permissions to run, please reinstall.");
      } else {
        console.error(error.message);
      }
    }
  }

  succeed("Initialized Dyno workspace");
}

export default {
  name: "init",
  action: init,
  description: "Init Dyno Project",
};
