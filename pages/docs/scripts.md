---
title: Scripts
---

# Scripts

Scripts are statements of commands that help to execute repetitive commands, so that you execute a smaller command and save time.

In general, the use of scripts should not delay the initialization of a command, but we are still testing its performance.

# Declaring Commands

As with dependencies, in scripts you have several ways to declare your scripts, which are:

## Simple way:

Just declare the command and nothing else.

Example:

```json
{
  "scripts": "deno run --allow-net --allow-read
  --import-map=dyno_map.json --reload mod.ts"
}
```

## Run deno commands easily #1

With this mode you can only execute deno files more easily

In this and the next dyno_map it is loaded automatically if it exists.

The example below represents the command that was placed in the simple way above:

File is the file to be executed, and options are the options of the deno

```json
{
  "scripts": {
    "start": {
      "file": "mod.ts",
      "options": [
        "allow-net",
        "allow-read"
        "reload"
      ]
    }
  }
}
```

But what if I want to declare that allow-read can only access a specific path? this is not possible in this mode, so you have to use the next mode.

## Run deno commands easily #1

This mode only exists so that options can receive values.

Like this:

```json
{
  "scripts": {
    "start": {
      "file": "mod.ts",
      "options": {
        "allow-net": "0.0.0.0:8000",
        "allow-read": "/example-folder",
        "seed": 1,
        "reload": true
      }
    }
  }
}
```
