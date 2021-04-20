import { fs, path } from "../../deps.ts";

export async function checkFiles() {
  return {
    dyno: await checkDynoFile(),
    map: await checkMapFile(),
  };
}

export async function getFiles(): Promise<Record<"dyno" | "map", unknown>> {
  return {
    dyno: await getDynoFile(),
    map: await getMapFile(),
  };
}

export function checkDynoFile(): Promise<boolean> {
  const path: string = getDynoPath();
  return fs.exists(path);
}

export function checkMapFile(): Promise<boolean> {
  const path: string = getMapPath();
  return fs.exists(path);
}

export function getMapPath(): string {
  return path.join(Deno.cwd(), "dyno_map.json");
}

export function getDynoPath() {
  return path.join(Deno.cwd(), "dyno.json");
}

export async function getDynoFile() {
  const dynoFileExists = await checkDynoFile();

  if (
    !dynoFileExists
  ) {
    throw new Error("Dyno file doesnt exist");
  }

  const path = getDynoPath();

  const dynoFile = await Deno.readTextFile(path);

  const dynoFileParsed = JSON.parse(dynoFile);

  return dynoFileParsed;
}

export async function getMapFile() {
  const mapFileExists = await checkMapFile();

  if (
    !mapFileExists
  ) {
    throw new Error("Map file doesnt exist");
  }

  const path = getMapPath();

  const mapFile = await Deno.readTextFile(
    path,
  );

  const mapFileParsed = JSON.parse(mapFile);

  return mapFileParsed;
}

export async function saveDynoMapFile(
  content: Record<string, unknown>,
): Promise<void> {
  const path = getMapPath();

  const contentString = JSON.stringify(content, null, "\t");

  await Deno.writeTextFile(path, contentString);
}
