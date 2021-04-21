import { CliffyCommandTypes } from "../deps.ts";

// importing commands

import runCommand from "./commands/run.ts";
import mapCommand from "./commands/map.ts";
import initCommand from "./commands/init.ts";

export interface CommandOption {
  name: string;
  description: string;
  config?:
    | CliffyCommandTypes.IFlagValueHandler
    | CliffyCommandTypes.ICommandOption<any, any, any, any, any>;
}

export interface CommandInterface {
  name: string;
  action: (options: any, argument: any) => void | Promise<void>;
  description: string;
  options?: CommandOption[];
}

export const commands: CommandInterface[] = [
  mapCommand,
  runCommand,
  initCommand,
];
