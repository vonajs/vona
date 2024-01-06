#!/usr/bin/env node

const Command = require('../lib/init_command.js');

(async () => {
  const options = {
    name: 'egg-born',
    configName: 'egg-born-init-config',
  };
  await new Command(options).run(process.cwd(), process.argv.slice(2));
})().catch(err => {
  console.error(err.stack);
  process.exit(1);
});
