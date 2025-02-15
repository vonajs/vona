const path = require('node:path');
const Command = require('@zhennann/egg-bin').Command;

const DISPATCH = Symbol.for('eb:Command#dispatch');

class EggBornBinCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-born-bin [command] [options]';

    // load directory
    this.load(path.join(__dirname, 'lib/cmd'));
  }

  async [DISPATCH]() {
    await super[DISPATCH]();
  }
}

module.exports = EggBornBinCommand;
