#!/usr/bin/env zx

import fs from "node:fs";

function isRoot() {
    if (typeof process.getuid != "function") {
        return false;
    }

    const uid = process.getuid();

    if (uid) {
        return false;
    }

    return true;
}

const msg = `
The script will install VIM and configure it

For learning vim, take a look at following resources:
https://devhints.io/vim
https://vimsheet.com/
https://quickref.me/vim
https://vim.rtorr.com/
https://www.freecodecamp.org/news/vim-isnt-that-scary-here-are-5-free-resources-you-can-use-to-learn-it-ab78f5726f8d/
https://github.com/iggredible/Learn-Vim
https://danielmiessler.com/study/vim/
http://www.vimgenius.com/lessons/vim-intro/levels/level-1
https://github.com/amix/vimrc
`;

console.log("");
console.log(chalk.yellowBright(msg));
console.log(chalk.yellowBright(`Platform: ${os.platform}`));
console.log("");

const root = isRoot();

if (!root) {
    console.error(chalk.red("This program must be run as root!"));
    process.exit(1);
}

await $`apt install -qq vim`;
echo(``);

await $`git clone --depth=1 https://github.com/amix/vimrc.git ~/.vim_runtime`;
echo(``);

await $`sh ~/.vim_runtime/install_awesome_vimrc.sh`;
echo(``);

//set nu
