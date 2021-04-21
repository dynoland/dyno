import { axiod } from "../../deps.ts";
import { DependencyError } from "../utils/dependencyError.ts";
import {
  DynoDependency,
  getDynoFile,
  saveDynoMapFile,
} from "../utils/files.ts";
import { fail, info, spin, start, succeed, warn } from "../utils/logger.ts";
import providers from "../utils/providers.ts";

interface ModuleDiagnostic {
  moduleExists: boolean;
  versionExists: boolean;
  latestVersion: string;
}

async function moduleDiagnostic(
  module: string,
  version: string,
): Promise<ModuleDiagnostic> {
  const moduleDiagnostic: ModuleDiagnostic = {
    moduleExists: false,
    versionExists: false,
    latestVersion: "",
  };
  let data = null;

  try {
    data = (await axiod.default.get(
      `https://cdn.deno.land/${module}/meta/versions.json`,
    )).data;
  } catch (error) {
    throw new DependencyError(
      module,
      "This dependency not exists in deno registry",
    );
  }

  moduleDiagnostic.moduleExists = true;

  if (!data?.latest) {
    throw new Error(`Module: ${module} not have published versions`);
  }

  if (version !== "latest") {
    if (Array.isArray(data?.versions) && !data?.versions?.includes(version)) {
      moduleDiagnostic.versionExists = false;
      throw new Error(`Module: ${module}, doesn't have version: ${version}`);
    }

    if (data?.latest && data?.latest !== version) {
      warn(
        `Module: ${module} is out of date update to the latest version: ${data
          ?.latest}`,
      );
    }
  } else {
    moduleDiagnostic.latestVersion = data.latest;
  }

  moduleDiagnostic.versionExists = true;

  return moduleDiagnostic;
}

function replaceProviderUrl(
  provider: string,
  packageName: string,
  version: string,
  path?: string,
) {
  return provider
    .replace("{package}", packageName)
    .replace("{version}", `@${version}`)
    .replace("{path}", path || "");
}

async function dependenciesToImportMap(
  dependencies: Record<string, string | DynoDependency>,
): Promise<Record<string, string>> {
  const importMap: Record<string, string> = {};

  await info("Mapping dependencies");

  for (const key in dependencies) {
    spin(`Mapping ${key} dependency`);
    const dependency = dependencies[key];

    if (typeof dependency === "string") {
      const pathKey = `${key}/`;
      const version: string = dependency;

      const { latestVersion } = await moduleDiagnostic(key, version);

      const path = replaceProviderUrl(
        providers.DENOLAND,
        key,
        version === "latest" ? latestVersion : version,
      );

      if (importMap[pathKey]) {
        throw new Error(
          `There is already a dependency with this name: ${key}.`,
        );
      }

      importMap[pathKey] = path;
    } else if (typeof dependency === "object") {
      const version = dependency?.version;

      if (!version) {
        throw new DependencyError(
          key,
          `'version' field is required`,
        );
      }

      if (!dependency?.path && !dependency.paths) {
        throw new DependencyError(
          key,
          `must be specify 'path' or 'paths' field`,
        );
      }

      if (dependency?.path && typeof dependency?.path !== "string") {
        throw new DependencyError(
          key,
          `'path' must be string`,
        );
      }

      if (dependency?.paths && typeof dependency?.paths !== "object") {
        throw new DependencyError(
          key,
          `'paths' must be a object`,
        );
      }

      const { latestVersion } = await moduleDiagnostic(key, version);

      if (dependency?.path) {
        const path = replaceProviderUrl(
          providers.DENOLAND,
          key,
          version === "latest" ? latestVersion : version,
          dependency?.path,
        );

        if (importMap[key]) {
          throw new Error(
            `There is already a dependency with this name: ${key}.`,
          );
        }

        importMap[key] = path;
      }

      if (dependency?.paths) {
        for (const dependencyBaseKey in dependency?.paths) {
          const dependencyBaseKeyIsPath = dependencyBaseKey.startsWith("/");

          const dependencyPath = dependencyBaseKeyIsPath
            ? dependencyBaseKey.substring(1)
            : dependencyBaseKey;

          const dependencyKey = `@${key}/${dependencyPath}`;

          const dependencyPathFile = dependency.paths[dependencyBaseKey];

          if (typeof dependencyPathFile !== "string") {
            throw new DependencyError(
              dependencyKey,
              "D01",
            );
          }

          const path = replaceProviderUrl(
            providers.DENOLAND,
            key,
            version,
            `${
              dependencyBaseKeyIsPath ? `${dependencyPath}/` : ""
            }${dependencyPathFile}`,
          );

          if (importMap[dependencyKey]) {
            throw new DependencyError(dependencyKey);
          }

          importMap[dependencyKey] = path;
        }
      }
    } else {
      throw new DependencyError(key);
    }
  }

  return importMap;
}

async function map(): Promise<void> {
  start();
  spin("Starting dependency mapping");

  try {
    const dynoFile = await getDynoFile();

    if (!dynoFile?.dependencies) {
      dynoFile.dependencies = {};
    }

    const importMap = await dependenciesToImportMap(dynoFile.dependencies);

    await saveDynoMapFile({ imports: importMap });

    await succeed("Done.");
  } catch (error) {
    fail(error.message);
  }
}

export default {
  name: "map",
  action: map,
  description: "Map dependencies to Dyno Map",
};
