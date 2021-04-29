---
title: Commands
---

# Commands

Dyno provides some commands that help to decrease the time doing manual things, currently, we only have 3 commands, but we hope to add more soon.

- [dyno init](#init): initializes the dyno workspace
- [dyno map](#map): maps your dependencies to `dyno_map.json` file
- [dyno run](#run): executes the scripts declared in `dyno.json` file

## Init Command <a id="init" href="#init"></a>

This command will start a deno workspace, specifically, if you are using Visual Studio Code, it will add `dyno_map.json` to your project's `settings.json` and create a `dyno.json`.

The `dyno_map.json` file will be created automatically when using: [dyno map](#map)

## Map Command <a id="map" href="#map"></a>

The map command will map, format and export your declared dependencies to `dyno_map.json`, to make it usable

## Run Command <a id="run" href="#run"></a>

If you have declared `scritps` in your `deno.json` file, dyno will execute the script-specific command.
