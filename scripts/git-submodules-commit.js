#!/usr/bin/env node

const fs = require('node:fs/promises');
const ChildProcess = require('child_process');
const eggBornUtils = require('egg-born-utils');
const argv = require('./lib/parse_argv')('sync');

(async function () {
  await main();
})();

const submodules = [
  'src/module/a-flownodebooster',
  'src/module/a-flowtask',
  'src/module/a-layoutpc',
  'src/module/a-markdown',
  'src/module/a-socketio',
  'src/module/bz-login',
  'src/module/test-flow',
  'src/module/test-note',
  'src/suite/a-dingtalk',
  'src/suite/a-paypal',
  'src/suite/a-wechat',
  'src/suite/a-wxwork',
  'src/suite/test-party',
  'src/suite/bz-diancai',
];

async function main() {
  const message = argv.args[0];
  for (const submodule of submodules) {
  }
}

async function spawn({ cmd, args = [], options = {} }) {
  if (!options.cwd) {
    options.cwd = this.cwd;
  }
  return new Promise((resolve, reject) => {
    const logPrefix = options.logPrefix;
    const proc = spawn(cmd, args, options);
    let stdout = '';
    // let stderr = '';
    proc.stdout.on('data', async data => {
      stdout += data.toString();
      await this.console.log({ text: data.toString() }, { logPrefix });
    });
    proc.stderr.on('data', async data => {
      // stderr += data.toString();
      await this.console.log({ text: data.toString() }, { logPrefix });
    });
    proc.once('exit', code => {
      if (code !== 0) {
        const err = new Error(`spawn ${cmd} ${args.join(' ')} fail, exit code: ${code}`);
        err.code = 10000 + code;
        return reject(err);
      }
      resolve(stdout);
    });
  });
}

async function spawnExe({ cmd, args, options }) {
  if (/^win/.test(process.platform)) {
    cmd = `${cmd}.exe`;
  }
  return await this.spawn({ cmd, args, options });
}

async function gitCommit({ cwd, message }) {
  // git status
  const stdout = await this.spawnExe({
    cmd: 'git',
    args: ['status'],
    options: {
      cwd,
    },
  });
  if (stdout.indexOf('nothing to commit, working tree clean') > -1 && stdout.indexOf('is ahead of') === -1) {
    // do nothing
    return;
  }
  if (stdout.indexOf('is ahead of') === -1) {
    // git add .
    await this.spawnExe({
      cmd: 'git',
      args: ['add', '.'],
      options: {
        cwd,
      },
    });
    // git commit
    await this.spawnExe({
      cmd: 'git',
      args: ['commit', '-m', message],
      options: {
        cwd,
      },
    });
  }
  // git push
  await this.spawnExe({
    cmd: 'git',
    args: ['push'],
    options: {
      cwd,
    },
  });
}
