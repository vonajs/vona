const path = require('node:path');
const { loadEnvs } = require('@cabloy/dotenv');
const { ensureArray } = require('@cabloy/ensure-array');
const boxen = require('boxen');
const chalk = require('chalk');
const eggBornUtils = require('egg-born-utils');

const boxenOptions = { padding: 1, margin: 1, align: 'center', borderColor: 'yellow', borderStyle: 'round' };

const utils = {
  async prepareToken(projectPath, tokenName, options) {
    options = options || {};
    const warnWhenEmpty = options.warnWhenEmpty;
    const token = await eggBornUtils.openAuthConfig.prepareToken(projectPath, tokenName);
    if (!token && warnWhenEmpty) {
      console.log(chalk.red(`Open auth token not found: ${tokenName}`));
      if (!tokenName) {
        const message = `Run ${chalk.keyword('orange')('> npm run test:backend <')} first!`;
        console.log(`\n${boxen(message, boxenOptions)}\n`);
      }
    }
    return token;
  },
  async checkIfDevServerRunning(options) {
    options = options || {};
    const projectPath = options.projectPath;
    const needDevServer = options.needDevServer;
    const warnWhenRunning = options.warnWhenRunning;
    // token
    const token = await eggBornUtils.openAuthConfig.prepareToken(projectPath, null);
    if (!token)
      return false;
    // OpenAuthClient
    const openAuthClient = new eggBornUtils.OpenAuthClient({ token });
    // echo
    try {
      await openAuthClient.post({
        path: '/a/base/auth/echo',
      });
      if (warnWhenRunning) {
        const message = chalk.keyword('orange')('The backend dev server is running!');
        console.log(`\n${boxen(message, boxenOptions)}\n`);
      }
      return true;
    }
    catch (err) {
      if (err.status === -1 && (err.address === '::1' || err.address === '127.0.0.1')) {
        if (needDevServer) {
          const message = `Run ${chalk.keyword('orange')('> npm run dev:backend <')} first!`;
          console.log(`\n${boxen(message, boxenOptions)}\n`);
        }
        return false;
      }
      throw err;
      // return true;
    }
  },
  async forceDevServerRunning(options) {
    // check if running
    let devServerRunning = await this.checkIfDevServerRunning({
      projectPath: options.projectPath,
      needDevServer: false,
      warnWhenRunning: false,
    });
    if (devServerRunning)
      return null;
    // start
    const Command = require('../index.js');
    const commandDev = new Command(['backend-dev', '--workers=1']);
    commandDev.start();
    // check if running
    while (true) {
      // sleep
      await eggBornUtils.tools.sleep(1000);
      // check
      devServerRunning = await this.checkIfDevServerRunning({
        projectPath: options.projectPath,
        needDevServer: false,
        warnWhenRunning: false,
      });
      if (devServerRunning) {
        break;
      }
    }
    // proc
    return commandDev.subCommand.proc;
  },
  getModulePath(moduleName) {
    const moduleFile = require.resolve(`${moduleName}/package.json`);
    return path.dirname(moduleFile);
  },
  getAppPackage() {
    const projectPath = this.getProjectDir();
    return require(path.join(projectPath, 'package.json'));
  },
  loadEnvAndConfig({ baseDir, flavor, env }) {
    // load envs
    const meta = { flavor: flavor || 'normal', mode: env, mine: 'mine' };
    const projectPath = path.join(baseDir, '../..');
    const envDir = path.join(projectPath, 'env');
    loadEnvs(meta, envDir, '.env');
  },
  getBaseDir() {
    return path.join(process.cwd(), 'dist/backend');
  },
  getProjectDir() {
    return process.cwd();
  },
  combineTestPattern({ baseDir, flavor, env, pattern }) {
    // pattern
    if (!pattern || pattern.length === 0) {
      pattern = ['src/**/test/**/*.test.ts'];
    }
    // disabledModules
    this.loadEnvAndConfig({ baseDir, flavor, env });
    const disabledModules = ensureArray(process.env.PROJECT_DISABLED_MODULES);
    for (const relativeName of disabledModules) {
      pattern.push(`!src/**/${relativeName}/test/**/*.test.ts`);
    }
    // disabledSuites
    const disabledSuites = ensureArray(process.env.PROJECT_DISABLED_SUITES);
    for (const relativeName of disabledSuites) {
      pattern.push(`!src/**/${relativeName}/modules/*/test/**/*.test.ts`);
    }
    // // cli templates
    // pattern.push('!src/**/cli/templates/**/*.test.ts');
    // expand glob
    // return eggBornUtils.tools.globbySync(pattern);
    return pattern;
  },
};
module.exports = utils;
