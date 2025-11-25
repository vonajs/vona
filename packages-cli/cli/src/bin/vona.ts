#!/usr/bin/env node

import path from 'node:path';
import { ProcessHelper } from '@cabloy/process-helper';
import fse from 'fs-extra';
import semver from 'semver';
import { VonaCommand } from '../start.ts';

const pnpm_version = '10.19.0';

const processHelper = new ProcessHelper(process.cwd());

main();

async function checkPnpm() {
  const res = await processHelper.spawnCmd({
    cmd: 'pnpm',
    args: ['--version'],
    options: {
      stdio: 'pipe',
      shell: true,
      dummy: true,
    },
  });
  const version = res.trimEnd();
  const lt = semver.lt(version, pnpm_version);
  if (lt) {
    throw new Error(`pnpm should >= ${pnpm_version}, current: ${version}`);
  }
}

async function main() {
  let args: string[] = [];
  // bootstrapFile
  let bootstrapFile = path.join(import.meta.dirname, '../bootstrap.ts');
  if (!fse.existsSync(bootstrapFile)) {
    bootstrapFile = path.join(import.meta.dirname, '../bootstrap.js');
  }
  const rawArgv = process.argv.slice(2);
  const isPlay = rawArgv[0] === 'play';
  if (isPlay) {
    args = args.concat([':bin:play']).concat(rawArgv.slice(1)).concat(['--dummy']);
    await new VonaCommand(args, true).start();
    return;
  }
  args.push(bootstrapFile);
  args = args.concat(rawArgv);
  await checkPnpm();
  processHelper.spawnCmd({ cmd: 'tsx', args });
}
