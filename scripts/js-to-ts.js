#!/usr/bin/env node

const path = require('path');
const fs = require('node:fs/promises');
const eggBornUtils = require('egg-born-utils');
const argv = require('./lib/parse_argv')('sync');

(async function () {
  await main();
})();

async function main() {
  // paths
  const paths = argv.args;
  const patterns = paths.map(item => {
    return `${item}/**/*.js`;
  });
  // files
  const files = await eggBornUtils.tools.globbyAsync(patterns);
  // convert
  const filesTo = [];
  for (const file of files) {
    const pos = String(file).lastIndexOf('.js');
    const fileTo = String(file).substring(0, pos) + '.ts';
    await fs.rename(file, fileTo);
    filesTo.push(fileTo);
  }
  console.log(filesTo);
}
