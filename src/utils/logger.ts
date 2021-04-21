import { wait } from "../../deps.ts";

const logger: wait.Spinner = wait.wait("Loading...");

export function start() {
  logger.start();
}

export function succeed(text: string) {
  logger.succeed(text);
}

export function fail(text: string) {
  logger.fail(text);
}

export function spin(text: string) {
  logger.text = text;
}

export function info(text: string) {
  logger.info(text);
}

export function warn(text: string) {
  logger.warn(text);
}
