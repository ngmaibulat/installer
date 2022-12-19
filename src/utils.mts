export function isRoot() {
    if (typeof process.getuid != "function") {
        return false;
    }

    const uid = process.getuid();

    if (uid) {
        return false;
    }

    return true;
}

export function genPassword(passwordLength: number) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
}

export function genSql(pass: string, filename: string) {
    const sql = `
    select host, user from mysql.user;

    drop database if exists test;
    create database if not exists app;

    ALTER USER root@localhost IDENTIFIED WITH caching_sha2_password BY '${pass}';
    `;

    const fstream = fs.writeFileSync(filename, sql);
}
