import { checkMapFile, getDynoFile } from "../utils/files.ts";

function mapOption(key: string): string {
  return key.startsWith("--") ? key : `--${key}`;
}

async function run(_: unknown, cmd: string): Promise<void> {
  const map = await checkMapFile();
  const dyno = await getDynoFile();

  if (!dyno?.scripts) {
    throw new Error("File dyno.json doesn't contains scripts section");
  }
  const script = dyno?.scripts[cmd];

  if (!script) {
    throw new Error(`Script '${cmd}' not found`);
  }

  const command: string[] = [];

  if (typeof script === "string") {
    command.push(...script.split(/\s/));
  } else {
    const file = script?.file;
    const options = script?.options;
    command.push("deno", "run");

    if (!file) {
      throw new Error(`Script ${cmd} did not specify the file`);
    }

    if (options) {
      if (Array.isArray(options)) {
        command.push(...options.map(mapOption));
      } else if (typeof options === "object") {
        for (const key in options) {
          const value = options[key];
          const isString = typeof value === "string";
          const isNumber = typeof value === "number";
          const isTrue = value === true;

          if (
            !isString &&
            !isNumber &&
            !isTrue
          ) {
            throw new Error(
              `Option: ${key} has not valid value: ${value}`,
            );
          }

          if (isString || isNumber) {
            command.push(`${mapOption(key)}=${value}`);
          }

          if (isTrue) {
            command.push(mapOption(key));
          }
        }
      }

      if (map) {
        command.push("--import-map=dyno_map.json");
      }
    }

    command.push(file);
  }

  const process = Deno.run({
    cmd: command,
  });

  await process.status();

  return;
}

export default {
  name: "run <cmd>",
  action: run,
  description: "Run scripts",
};
