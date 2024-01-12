#!/usr/bin/env node

const { ProcessHelper } = require('@cabloy/process-helper');
const argv = require('./lib/parse_argv')('sync');

const subModules = [
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

(async function () {
  await main();
})();

async function main() {
  // message
  const message = argv.args[0];
  const processHelper = new ProcessHelper(process.cwd());
  // loop
  for (const subModule of subModules) {
    const cwd = `${process.cwd()}/${subModule}`;
    await processHelper.gitCommit({ cwd, message });
  }
  // main
  await processHelper.gitCommit({ message });
}
