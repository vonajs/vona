const DebugCommand = require('@zhennann/egg-bin').DebugCommand;
const utils = require('../utils.js');

class BackendDebugCommand extends DebugCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-born-bin backend-debug';
  }

  async run(context) {
    if (!context.argv.framework) {
      context.argv.framework = utils.getModulePath('egg-born-backend');
    }

    if (!context.argv.baseDir) context.argv.baseDir = 'src/backend';

    // check dev server
    const devServerRunning = await utils.checkIfDevServerRunning({
      warnWhenRunning: true,
    });
    if (devServerRunning) return;

    utils.versionCheckCabloy({ scene: 'debug' }).then(() => {});

    await super.run(context);
  }

  description() {
    return 'backend debug';
  }
}

module.exports = BackendDebugCommand;
