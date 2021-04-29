---
title: Dependencies
---

# Dependencies

The dyno dependencies is a easy way to manage your project dependendencies.

We are currently only supporting the deno.land registy.

You have two ways to declare dependencies and you can combine multiples way in Dyno File

## Way #1 (The basic)

Basically in mode one, you just declare the package name and its version.

```json
{
  "dependencies": {
    "<module name>": "<version or 'latest'>"
  }
}
```

and you can use this dependency like this:

```ts
import { anything1, anything2 } from "<module name>/mod.ts";
```

## Way #2 (Complex)

As mode 2 is more complex, we will see in part how it works.

Let's use as an example the deno std library as an example

### Declaring version

First step declare the name and version of the mode:

```json
{
  "dependencies": {
    "std": {
      "version": "latest"
    }
  }
}
```

### Declaring path

Ok, now we need to declare, `path`, `paths` or the 2.

> `path` is the library's entrypath if you want to import it as:
>
> ```ts
> import { anything1 } from "<module name>";
> ```
>
> and not
>
> ```ts
> import { anything1 } from "<module name>/entrypath.ts";
> ```

If you don't know what **"entrypath"** is, it is mod.ts or equivalent.

So let's declare it, as the std module does not have an entrypath (mod.ts), I will use version.ts as an example only.:

```json
{
  "dependencies": {
    "std": {
      "version": "latest",
      "path": "version.ts"
    }
  }
}
```

And now I can use it like this in the code:

```ts
import { VERSION } from "std";

console.log(VERSION);
```

### Declaring paths

But what if I want to use for example the http of the std?

This is where "paths" come in.

_paths_ serve to declare more than one path in a module, and it will be interpreted as: `@<module name>/<sub module>/<path>`

Let's see how this works in practice: first let's declare in the simplest way:

```json
{
  "dependencies": {
    "std": {
      "version": "0.94.0",
      "path": "mod.ts",
      "paths": {
        "http": "http/mod.ts"
      }
    }
  }
}
```

Right now we can use the http module like this:

```ts
import { serve } from "@std/http";
```

### Simplifying the use of the paths

Okay, but it can be a bit of repeating the name of the submodule you declared and repeating it in the entrypath, so you can simplify using:

```json
{
  "dependencies": {
    "std": {
      "version": "0.94.0",
      "path": "mod.ts",
      "paths": {
        "/http": "mod.ts"
    }
  }
}
```

In this simpler way, you can also use as: `@std/http` without repeating the http twice.

It is worth remembering that after any change in the dependencies of dyno.json you must execute: `$ dyno map` command, to map your dependencies.
