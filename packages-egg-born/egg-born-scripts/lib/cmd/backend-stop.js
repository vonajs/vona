const StopCommand = require('@zhennann/egg-scripts').StopCommand;
const utils = require('../utils.js');

class BackendStopCommand extends StopCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-born-scripts backend-stop';
  }

  async run(context) {
    if (!context.argv.framework) {
      context.argv.framework = utils.getModulePath('egg-born-backend');
    }

    if (!context.argv._ || context.argv._.length === 0) context.argv._ = ['dist/backend'];

    if (!context.argv.title) {
      context.argv.title = `cabloy-server-${utils.getAppPackage().name}`;
    }

    if (!context.env.NODE_OPTIONS) {
      context.env.NODE_OPTIONS = '';
    }
    context.env.NODE_OPTIONS += ' --no-warnings';

    await super.run(context);
  }

  description() {
    return 'backend stop';
  }
}

module.exports = BackendStopCommand;
