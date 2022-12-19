#!/bin/bash

tsc

rollup -i js/ubuntu-mysql.mjs -o dist/ubuntu-mysql.mjs -f es --banner '#!/usr/bin/env zx'
rollup -i js/ubuntu-vim.mjs   -o dist/ubuntu-vim.mjs   -f es --banner '#!/usr/bin/env zx'
rollup -i js/c-vim.mjs        -o dist/c-vim.mjs        -f es --banner '#!/usr/bin/env zx'
rollup -i js/gen-pw.mjs       -o dist/gen-pw.mjs       -f es --banner '#!/usr/bin/env zx'

chmod +x dist/*

git add .

git status
