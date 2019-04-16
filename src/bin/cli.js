#!/usr/bin/env node

const commander = require("commander");

const program = commander
  .version("0.1.0")
  .usage(
    `
<packageLockFile>

Arguments:
    packageLockFile - path to package lock JSON file.
`
  )
  .parse(process.argv);

const lockfilePath = program.args[0];
require("../index.js")(lockfilePath);
