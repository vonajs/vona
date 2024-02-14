const Command = require('@zhennann/egg-bin').Command;
const utils = require('../utils.js');

class BackendBuildCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-born-scripts backend-build';
  }

  async run({ cwd }) {
    console.log('run backend build at %s', cwd);

    await utils.prepareProjectAll({ env: 'prod' });
  }

  description() {
    return 'backend build';
  }
}

module.exports = BackendBuildCommand;
