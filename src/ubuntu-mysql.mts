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
const approPw = genPassword(12);
const apprwPw = genPassword(12);

genSql(pass, approPw, apprwPw, dbname, "tmp.sql");

await $`apt install -qq mysql-server`;
echo(``);

await $`systemctl start mysql.service`;
echo(``);

await $`systemctl enable mysql.service`;
echo(``);

await $`cat tmp.sql | mysql`;
echo(``);

let env = createEnv(dbname, "root", pass);
let fstream = fs.createWriteStream("root.env");
fstream.write(env);

env = createEnv(dbname, "appro", approPw);
fstream = fs.createWriteStream("appro.env");
fstream.write(env);

env = createEnv(dbname, "apprw", approPw);
fstream = fs.createWriteStream("apprw.env");
fstream.write(env);

echo(chalk.yellowBright(`Review files: tmp.sql, root.env, appro.env, apprw.env`));
echo(chalk.yellowBright(`Secure them, as they contain sensitive information`));
echo(``);
