#!/usr/bin/env node

import path from 'node:path';
import { ProcessHelper } from '@cabloy/process-helper';
import fse from 'fs-extra';

const processHelper = new ProcessHelper(process.cwd());

let args: string[] = ['--experimental-transform-types', '--loader=ts-node/esm'];
// bootstrapFile
let bootstrapFile = path.join(import.meta.dirname, '../bootstrap.ts');
if (!fse.existsSync(bootstrapFile)) {
  bootstrapFile = path.join(import.meta.dirname, '../bootstrap.js');
}
args.push(bootstrapFile);
const rawArgv = process.argv.slice(2);
args = args.concat(rawArgv);

processHelper.spawnExe({ cmd: 'node', args });
