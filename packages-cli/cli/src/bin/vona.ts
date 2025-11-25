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
  // bootstrapFile
  let bootstrapFile = path.join(import.meta.dirname, '../bootstrap.ts');
  if (!fse.existsSync(bootstrapFile)) {
    bootstrapFile = path.join(import.meta.dirname, '../bootstrap.js');
  }
  // args
  let args: string[] = [];
  const rawArgv = process.argv.slice(2);
  const isPlay = rawArgv[0] === 'play';
  const isPlayAttach = isPlay && (rawArgv.includes('-a') || rawArgv.includes('--attach'));
  if (isPlay) {
    if (!isPlayAttach) {
      args.push(bootstrapFile);
    }
    args = args.concat([':bin:play']).concat(rawArgv.slice(1)).concat(['--dummy']);
  } else {
    args.push(bootstrapFile);
    args = args.concat(rawArgv);
  }
  // run
  if (isPlayAttach) {
    const command = new VonaCommand(args, true);
    await command.start();
  } else {
    if (!isPlay) {
      await checkPnpm();
    }
    processHelper.spawnCmd({ cmd: 'tsx', args });
  }
}
