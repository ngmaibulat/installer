#!/usr/bin/env zx

import fs from "node:fs";
import { isRoot, genPassword, genSql } from "./utils.mjs";

const msg = "The script will deploy MySQL Server and set a random root password";

console.log("");
console.log(chalk.yellowBright(msg));
console.log(chalk.yellowBright(`Platform: ${os.platform}`));
console.log("");

const root = isRoot();

if (!root) {
    console.error(chalk.red("This program must be run as root!"));
    process.exit(1);
}

const pass = genPassword(12);
genSql(pass, "tmp.sql");

await $`apt install -qq mysql-server`;
echo(``);

await $`systemctl start mysql.service`;
echo(``);

await $`systemctl enable mysql.service`;
echo(``);

await $`cat tmp.sql | mysql`;
echo(``);

echo(chalk.greenBright(`mysql root@localhost password:`));
echo(chalk.greenBright(pass));
echo(``);

echo(chalk.red(`See tmp.sql for the SQL commands run`));
echo(chalk.red(`Delete it or move to a secure place, as it contains the password for root@localhost mysql user`));
echo(``);
