#!/usr/bin/env node

const fs = require('node:fs/promises');
const eggBornUtils = require('egg-born-utils');
const argv = require('./lib/parse_argv')('sync');

const extFrom = '.js';
const extTo = '.ts';

(async function () {
  await main();
})();

async function main() {
  // paths
  const paths = argv.args;
  const patterns = paths.map((item) => {
    return `${item}/**/*${extFrom}`;
  });
  // files
  const files = await eggBornUtils.tools.globbyAsync(patterns);
  // convert
  const filesTo = [];
  for (const file of files) {
    const pos = String(file).lastIndexOf(extFrom);
    const fileTo = String(file).substring(0, pos) + extTo;
    await fs.rename(file, fileTo);
    filesTo.push(fileTo);
  }
  console.log(filesTo);
}
