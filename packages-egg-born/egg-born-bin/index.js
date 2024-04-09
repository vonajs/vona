const path = require('path');
const chalk = require('chalk');
const Command = require('@zhennann/egg-bin').Command;
const eggBornUtils = require('egg-born-utils');
const utils = require('./lib/utils.js');
const CliCommand = require('./lib/cmd/cli.js');
const DISPATCH = Symbol.for('eb:Command#dispatch');
const PARSE = Symbol.for('eb:Command#parse');

class EggBornBinCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-born-bin [command] [options]';

    // load directory
    this.load(path.join(__dirname, 'lib/cmd'));
  }

  async [DISPATCH]() {
    const commandName = this.rawArgv[0];
    // general
    if (commandName !== 'cli') {
      await super[DISPATCH]();
      return;
    }
    // cli
    await this._handleCli();
  }

  async _handleCli() {
    // get parsed argument without handling helper and version
    const parsed = await this[PARSE](this.rawArgv);
    // argv
    const argv = {};
    argv.projectPath = process.cwd();
    // cli
    Object.assign(argv, this._prepareCliFullName(parsed._[1]));
    // token / proc
    const tokenAndProc = await this._prepareTokenAndDevServer({ parsed, argv });
    if (!tokenAndProc) {
      // do nothing
      return;
    }
    const { token, proc } = tokenAndProc;
    // OpenAuthClient
    const openAuthClient = new eggBornUtils.OpenAuthClient({ token });
    // signin
    await openAuthClient.signin();
    // cli meta
    const meta = await openAuthClient.post({
      path: '/a/cli/cli/meta',
      body: {
        context: {
          argv,
        },
      },
    });
    // cli run
    const rawArgv = this.rawArgv.slice();
    const index = rawArgv.indexOf('cli');
    if (index > -1) {
      rawArgv.splice(0, index + 2);
    }
    const command = new CliCommand(rawArgv, { meta, argv, openAuthClient });
    await command[DISPATCH]();
    // logout
    await openAuthClient.logout();
    // proc kill
    if (proc) {
      proc.kill('SIGTERM');
      await eggBornUtils.tools.sleep(1500);
    }
    // force exit
    process.exit(0);
  }

  async _prepareTokenAndDevServer({ parsed, argv }) {
    const tokenName = parsed.token || parsed.t;
    let token = await utils.prepareToken(argv.projectPath, tokenName, { warnWhenEmpty: false });
    if (!token && tokenName) {
      console.log(chalk.red(`Open auth token not found: ${tokenName}`));
      // interrupted
      console.log(chalk.red('  cli interrupted!\n'));
      return null;
    }
    // check dev server
    let proc;
    if (!token || token.host.indexOf('http://127.0.0.1') === 0 || token.host.indexOf('http://localhost') === 0) {
      proc = await utils.forceDevServerRunning({
        projectPath: argv.projectPath,
      });
    }
    // reload token
    if (!token || proc) {
      token = await utils.prepareToken(argv.projectPath, tokenName, { warnWhenEmpty: true });
      if (!token) {
        // interrupted
        console.log(chalk.red('  cli interrupted!\n'));
        return null;
      }
    }
    // ready
    return { token, proc };
  }

  _prepareCliFullName(cliName) {
    if (!cliName) {
      return { cliFullName: 'a-clibooster:default:list' };
      // throw new Error('Please specify the cli name');
    }
    const parts = cliName.split(':');
    if (parts.length === 1) {
      // means show module's commands
      parts[1] = '';
    }
    if (parts.length === 2) {
      if (parts[1]) {
        // means show group's commands
        parts[2] = '';
      } else {
        // means show module's commands
        if (!parts[0]) parts[0] = 'a-clibooster';
        return { cliFullName: 'a-clibooster:default:list', module: parts[0] };
      }
    }
    if (!parts[0]) parts[0] = 'a-clibooster';
    if (!parts[1]) parts[1] = 'default';
    if (!parts[2]) {
      // means show group's commands
      return { cliFullName: 'a-clibooster:default:list', module: parts[0], group: parts[1] };
    }
    // default
    return { cliFullName: parts.join(':') };
  }
}

module.exports = EggBornBinCommand;
