const TestCommand = require('@zhennann/egg-bin').TestCommand;
const utils = require('../utils.js');

class BackendTestCommand extends TestCommand {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-born-bin backend-test';
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

    // spec
    context.argv._ = utils.combineTestPattern({
      baseDir,
      flavor: context.argv.flavor,
      env: 'unittest',
      pattern: context.argv._,
    });

    // check dev server
    const devServerRunning = await utils.checkIfDevServerRunning({
      warnWhenRunning: true,
    });
    if (devServerRunning)
      return;

    // run
    await super.run(context);
  }

  async formatTestArgs({ argv, debugOptions, execArgvObj }) {
    const testArgv = Object.assign({}, argv);

    /* istanbul ignore next */
    testArgv.timeout = testArgv.timeout || process.env.TEST_TIMEOUT || 0;
    testArgv.reporter = testArgv.reporter || process.env.TEST_REPORTER;
    // force exit
    testArgv.exit = true;

    // whether is debug mode, if pass --inspect then `debugOptions` is valid
    // others like WebStorm 2019 will pass NODE_OPTIONS, and egg-bin itself will be debug, so could detect `process.env.JB_DEBUG_FILE`.

    if (debugOptions || process.env.JB_DEBUG_FILE) {
      // --no-timeout
      testArgv.timeout = false;
    }

    // collect require
    const requireArr = execArgvObj.require;
    /* istanbul ignore next */
    if (Array.isArray(testArgv.require)) {
      for (const r of testArgv.require) {
        requireArr.push(r);
      }
    }

    // clean mocha stack, inspired by https://github.com/rstacruz/mocha-clean
    // [mocha built-in](https://github.com/mochajs/mocha/blob/master/lib/utils.js#L738) don't work with `[npminstall](https://github.com/cnpm/npminstall)`, so we will override it.
    if (!testArgv.fullTrace)
      requireArr.unshift(require.resolve('@zhennann/egg-bin/lib/mocha-clean'));

    // handle mochawesome enable
    if (!testArgv.reporter && testArgv.mochawesome) {
      // use https://github.com/node-modules/mochawesome/pull/1 instead
      testArgv.reporter = require.resolve('mochawesome-with-mocha');
      testArgv['reporter-options'] = 'reportDir=node_modules/.mochawesome-reports';
      if (testArgv.parallel) {
        // https://github.com/adamgruber/mochawesome#parallel-mode
        requireArr.push(require.resolve('mochawesome-with-mocha/register'));
      }
    }

    testArgv.require = requireArr;

    let pattern;
    // changed
    if (testArgv.changed) {
      pattern = await this._getChangedTestFiles();
      if (!pattern.length) {
        console.log('No changed test files');
        return;
      }
    }

    if (!pattern) {
      // specific test files
      pattern = testArgv._.slice();
    }
    if (!pattern.length && process.env.TESTS) {
      pattern = process.env.TESTS.split(',');
    }

    // // collect test files
    // if (!pattern.length) {
    //   pattern = [`test/**/*.test.${testArgv.typescript ? 'ts' : 'js'}`];
    // }
    // by zhennann
    // pattern = pattern.concat([ '!test/fixtures', '!test/node_modules' ]);

    // // expand glob and skip node_modules and fixtures
    // const files = eggBornUtils.tools.globbySync(pattern);
    // files.sort();

    // if (files.length === 0) {
    //   console.log(`No test files found with ${pattern}`);
    //   return;
    // }

    // // auto add setup file as the first test file
    // const setupFile = path.join(process.cwd(), `test/.setup.${testArgv.typescript ? 'ts' : 'js'}`);
    // if (fs.existsSync(setupFile)) {
    //   files.unshift(setupFile);
    // }
    // testArgv._ = files;

    // remove alias
    testArgv.$0 = undefined;
    testArgv.r = undefined;
    testArgv.t = undefined;
    testArgv.g = undefined;
    testArgv.typescript = undefined;
    testArgv['dry-run'] = undefined;
    testArgv.dryRun = undefined;
    testArgv.mochawesome = undefined;

    return this.helper.unparseArgv(testArgv);
  }

  description() {
    return 'backend test';
  }
}

module.exports = BackendTestCommand;
