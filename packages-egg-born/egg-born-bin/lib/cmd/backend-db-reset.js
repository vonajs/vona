const chalk = require('chalk');
const TestCommand = require('@zhennann/egg-bin').TestCommand;
const utils = require('../utils.js');

class BackendDbResetCommand extends TestCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-born-bin backend-db-reset';
  }

  async run(context) {
    context.argv.timeout = 0;
    context.argv.exit = true;
    context.argv.extension = ['ts'];

    if (!context.env.NODE_OPTIONS) {
      context.env.NODE_OPTIONS = '';
    }
    context.env.NODE_OPTIONS += ' --no-warnings --loader=ts-node/esm --conditions=development';
    context.argv.tscompiler = undefined;
    context.argv.eggTsHelper = undefined;
    context.argv.tsconfigPaths = undefined;
    context.argv['tsconfig-paths'] = undefined;
    context.argv.mochawesome = false;

    // baseDir
    const baseDir = utils.getBaseDir();
    // env
    context.env.EGG_BASE_DIR = baseDir;
    context.env.EGG_FRAMEWORK = utils.getModulePath('egg-born-backend');
    context.env.NODE_ENV = 'test';
    context.env.META_FLAVOR = context.argv.flavor;

    // check dev server
    const devServerRunning = await utils.checkIfDevServerRunning({
      warnWhenRunning: true,
    });
    if (devServerRunning)
      return;

    // run
    const mochaFile = require.resolve('../mockApp.js');
    const testArgs = await this.formatTestArgs(context);
    if (!testArgs)
      return;

    const opt = {
      env: Object.assign(
        {
          NODE_ENV: 'test',
        },
        context.env,
      ),
      execArgv: [...context.execArgv],
    };

    await this.helper.forkNode(mochaFile, testArgs, opt);

    // done
    console.log(chalk.cyan('  backend-db-reset successfully!'));
    process.exit(0);
  }

  async formatTestArgs({ argv }) {
    const testArgv = Object.assign({}, argv);
    return this.helper.unparseArgv(testArgv);
  }

  description() {
    return 'backend db reset';
  }
}

module.exports = BackendDbResetCommand;
