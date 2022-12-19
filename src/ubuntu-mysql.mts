#!/usr/bin/env zx

import fs from "node:fs";
import { isRoot, genPassword, genSql, createEnv } from "./utils.mjs";

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

//get policy path from argv
if (!argv._.length) {
    const errmsg = chalk.red("Please specify database name to create\n");
    const help = chalk.greenBright("example: sudo npx i-ubuntu-mysql blogapp\n");
    console.error(errmsg);
    console.log(help);
    process.exit(1);
}

const dbname = argv._[0];

const pass = genPassword(12);
genSql(pass, dbname, "tmp.sql");

await $`apt install -qq mysql-server`;
echo(``);

await $`systemctl start mysql.service`;
echo(``);

await $`systemctl enable mysql.service`;
echo(``);

await $`cat tmp.sql | mysql`;
echo(``);

const env = createEnv(dbname, "root", pass);
echo(chalk.green(env));

const fstream = fs.createWriteStream(".env");
fstream.write(env);

echo(chalk.red(`See tmp.sql for the SQL commands run`));
echo(chalk.red(`Secure it, as it contains the password for root@localhost mysql user`));
echo(``);

echo(chalk.red(`See .env file for the DB access setting`));
echo(chalk.red(`Secure it, as it contains sensitive information`));
echo(``);
