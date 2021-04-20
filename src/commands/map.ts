import { getDynoFile, saveDynoMapFile } from "../utils/files.ts";
import { fail, info, spin, succeed } from "../utils/logger.ts";
import providers from '../utils/providers.ts'

interface DependenciesOptions {
  version: string;
  path?: string;
  paths: Record<string, string>;
}

type Dependencies = string | DependenciesOptions;

function replaceProviderUrl(provider: string, packageName: string, version: string, path?: string) {
  return provider
      .replace('{package}', packageName)
      .replace('{version}', version !== 'latest' ? `@${version}` : '')
      .replace('{path}', path || '')
}

async function dependenciesToImportMap(
  dependencies: Record<string, Dependencies>,
): Promise<Record<string, string>> {
  const importMap = {};

  await info("Mapping dependencies");

  for (const key in dependencies) {
    if(typeof dependencies[key] === 'string') {
      const version = dependencies[key];
      const path = replaceProviderUrl(providers.DENOLAND, key, version);

      if(importMap[key]) {
        throw new Error(`There is already a dependency with this name: ${key}.`);
      }

      importMap[key] = path;

    } else if(typeof dependencies[key] === 'object') {
      const dependency = dependencies[key];

      if(!dependency?.version) {
        throw new Error(`It was not possible to parse '${key}' dependency.\n'version' field is required`);
      }

      if(!dependency?.path && !dependency.paths) {
        throw new Error(`It was not possible to parse '${key}' dependency.\nmust be specify 'path' or 'paths' field`);
      }

      if(dependency?.path && typeof dependency?.path !== 'string') {
        throw new Error(`It was not possible to parse '${key}' dependency.\n'path' must be string`);
      }

      if(dependency?.paths && typeof dependency?.paths !== 'object') {
        throw new Error(`It was not possible to parse '${key}' dependency.\n'paths' must be a object`);
      }

      const version = dependency.version;

      if(dependency?.path) {
        const path = replaceProviderUrl(providers.DENOLAND, key, version, dependency?.path);

        if(importMap[key]) {
          throw new Error(`There is already a dependency with this name: ${key}.`);
        }

        importMap[key] = path;
      }

      if(dependency?.paths) {
        for (const dependencyPath in dependency?.paths) {
          const dependencyKey = `@${key}/${dependencyPath}`;

          if(typeof dependency.paths[dependencyPath] !== 'string') {
            throw new Error(`It was not possible to parse '${dependencyKey}' dependency`)
          }

          const path = replaceProviderUrl(providers.DENOLAND, dependencyKey, version, dependencyPath);

          if(importMap[dependencyKey]) {
            throw new Error(`There is already a dependency with this name: ${dependencyKey}.`);
          }

          importMap[dependencyKey] = path;
        }
      }

    } else {
      throw new Error(`It was not possible to parse '${key}' dependency`)
    }

  }

  return importMap;
}

async function map(): Promise<void> {
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
