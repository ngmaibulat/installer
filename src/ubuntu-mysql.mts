#!/usr/bin/env zx

import fs from "node:fs";

const msg = "The script will deploy MySQL Server and set a random root password";

console.log("");
console.log(chalk.yellowBright(msg));
console.log(chalk.yellowBright(`Platform: ${os.platform}`));
console.log("");

function genSql() {
    const pass = "generated!";

    const sql = `
    select host, user from mysql.user;

    drop database if exists test;
    create database if not exists app;

    ALTER USER root@localhost IDENTIFIED WITH caching_sha2_password BY '${pass}';
    `;

    const fstream = fs.writeFileSync("tmp.sql", sql);
}

genSql();

await $`apt install -qq mysql-server`;
echo(``);

await $`systemctl start mysql.service`;
echo(``);

await $`systemctl enable mysql.service`;
echo(``);

await $`cat tmp.sql | mysql`;
echo(``);

//generate password for root
//create limited user for the app database
//generate .env file for the web app
//script for rotation of passwords
