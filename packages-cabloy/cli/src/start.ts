import path from 'path';
import chalk from 'chalk';
import CommonBin from '@zhennann/common-bin';
import eggBornUtils from 'egg-born-utils';
import utils from './lib/utils.js';
import CliCommand from './lib/cmd/cli.js';
import { CmdArgv } from './types/argv.js';
import { BeanCli } from './lib/bean.cli.js';
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
    const argv = {
      projectPath: process.cwd(),
    } as CmdArgv;
    // cli
    Object.assign(argv, this._prepareCliFullName(parsed._[1]));
    // cli meta
    const context = { argv };
    const beanCli = new BeanCli();
    const meta = await beanCli.meta({ context });
    // cli run
    const rawArgv = this.rawArgv.slice();
    rawArgv.splice(0, rawArgv.indexOf('cabloy') + 2);
    const command = new CliCommand(rawArgv, { meta, argv });
    await command[DISPATCH]();
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
        return { cliFullName: 'core:default:list', set: parts[0] };
      }
    }
    if (!parts[0]) parts[0] = 'core';
    if (!parts[1]) parts[1] = 'default';
    if (!parts[2]) {
      // means show group's commands
      return { cliFullName: 'core:default:list', set: parts[0], group: parts[1] };
    }
    // default
    return { cliFullName: parts.join(':') };
  }
}
