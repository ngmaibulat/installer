#!/usr/bin/env zx

import { genPassword } from "./utils.mjs";

const pass = genPassword(12);

echo(pass);
