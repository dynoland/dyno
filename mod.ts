import { CliffyCommand } from "./deps.ts";
import { commands } from "./src/commands.ts";
import { fix } from "https://deno.land/x/cstack/utils.ts";

try {
  const VERSION = "1.0.0";

  const command = new CliffyCommand.Command()
    .name("dyno")
    .version(VERSION);

  // load commands
  for (const { name, description, action, options } of commands) {
    command.command(name);

    if (options) {
      for (const { name, description, config } of options) {
        command.option(name, description, config);
      }
    }

    command
      .description(description)
      .action(action);
  }

  await command.parse(Deno.args);
} catch (error) {
  throw fix(error);
}
