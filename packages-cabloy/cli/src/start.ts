import path from 'path';
import chalk from 'chalk';
import CommonBin from '@zhennann/common-bin';
import eggBornUtils from 'egg-born-utils';
import utils from './lib/utils.js';
import CliCommand from './lib/cmd/cli.js';
import { CmdArgv } from './types/argv.js';
const DISPATCH = Symbol.for('eb:Command#dispatch');
const PARSE = Symbol.for('eb:Command#parse');

export class CabloyCommand extends CommonBin {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: cabloy [command] [options]';
  }

  async [DISPATCH]() {
    // cli
    await this._handleCli();
  }

  async _handleCli() {
    // get parsed argument without handling helper and version
    const parsed = await this[PARSE](this.rawArgv);
    // argv
    const argv: CmdArgv = {
      projectPath: process.cwd(),
    };
    // cli
    Object.assign(argv, this._prepareCliFullName(parsed._[1]));
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
    rawArgv.splice(rawArgv.indexOf('cli'), 2);
    const command = new CliCommand(rawArgv, { meta, argv, openAuthClient });
    await command[DISPATCH]();
    // logout
    await openAuthClient.logout();
    // force exit
    process.exit(0);
  }

  _prepareCliFullName(cliName) {
    if (!cliName) {
      return { cliFullName: 'core:default:list' };
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
        if (!parts[0]) parts[0] = 'core';
        return { cliFullName: 'core:default:list', module: parts[0] };
      }
    }
    if (!parts[0]) parts[0] = 'core';
    if (!parts[1]) parts[1] = 'default';
    if (!parts[2]) {
      // means show group's commands
      return { cliFullName: 'core:default:list', module: parts[0], group: parts[1] };
    }
    // default
    return { cliFullName: parts.join(':') };
  }
}
