#!/usr/bin/env zx

import { isRoot } from "./utils.mjs";

const root = isRoot();

if (!root) {
    console.error(chalk.red("This program must be run as root!"));
    process.exit(1);
}

await $`apt install -qq vim`;
echo(``);
