const path = require('path');
const fse = require('fs-extra');
const urllib = require('urllib');
const semver = require('semver');
const chalk = require('chalk');
const boxen = require('boxen');
const extend = require('@cabloy/extend').default;
const eggBornUtils = require('egg-born-utils');
const { ProcessHelper } = require('@cabloy/process-helper');
const { glob } = require('@cabloy/module-glob');

const boxenOptions = { padding: 1, margin: 1, align: 'center', borderColor: 'yellow', borderStyle: 'round' };

const utils = {
  async tsc() {
    const processHelper = new ProcessHelper();
    await processHelper.tsc();
  },
  async prepareToken(projectPath, tokenName, options) {
    options = options || {};
    const warnWhenEmpty = options.warnWhenEmpty;
    const token = await eggBornUtils.openAuthConfig.prepareToken(projectPath, tokenName);
    if (!token && warnWhenEmpty) {
      console.log(chalk.red(`Open auth token not found: ${tokenName}`));
      if (!tokenName) {
        const message = `Run ${chalk.keyword('orange')('> npm run test:backend <')} first!`;
        console.log('\n' + boxen(message, boxenOptions) + '\n');
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
    if (!token) return false;
    // OpenAuthClient
    const openAuthClient = new eggBornUtils.OpenAuthClient({ token });
    // echo
    try {
      await openAuthClient.post({
        path: '/a/base/auth/echo',
      });
      if (warnWhenRunning) {
        const message = chalk.keyword('orange')('The backend dev server is running!');
        console.log('\n' + boxen(message, boxenOptions) + '\n');
      }
      return true;
    } catch (err) {
      if (err.status === -1 && (err.address === '::1' || err.address === '127.0.0.1')) {
        if (needDevServer) {
          const message = `Run ${chalk.keyword('orange')('> npm run dev:backend <')} first!`;
          console.log('\n' + boxen(message, boxenOptions) + '\n');
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
    if (devServerRunning) return null;
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
  async versionCheck({ moduleName, moduleVersion, scene, mode }) {
    try {
      const httpClient = urllib.create();
      const url = 'https://portal.cabloy.com/api/cabloy/store/util/version';
      const options = {
        method: 'POST',
        data: {
          moduleName,
          moduleVersion,
          scene,
          mode,
        },
        dataType: 'json',
        followRedirect: true,
        maxRedirects: 5,
        timeout: 20000,
      };
      const res = await httpClient.request(url, options);
      return res.data.data;
    } catch (err) {
      // console.log(err);
      return null;
    }
  },
  getProjectMode() {
    const cabloyPath = this.__getCabloyPath();
    return cabloyPath.indexOf('packages-cabloy') > -1 ? 'source' : 'project';
  },
  async versionCheckCabloy({ scene }) {
    try {
      // cabloy
      const cabloyPath = this.__getCabloyPath();
      if (!cabloyPath) return;
      const _pkg = require(path.join(cabloyPath, 'package.json'));
      // moduleVersion
      const moduleVersion = _pkg.version;
      // mode
      const mode = this.getProjectMode();
      // versionCheck
      const moduleVersionCurrent = await this.versionCheck({ moduleName: 'cabloy', moduleVersion, scene, mode });
      if (!moduleVersionCurrent) return;
      // prompt
      this.versionPromptCabloy({ mode, moduleName: 'cabloy', moduleVersion, moduleVersionCurrent });
    } catch (err) {
      console.log(err);
    }
  },
  versionPromptCabloy({ mode, moduleName, moduleVersion, moduleVersionCurrent }) {
    try {
      const lt = semver.lt(moduleVersion, moduleVersionCurrent);
      if (!lt) return;
      setTimeout(() => {
        // log
        let message = `[${chalk.keyword('cyan')(moduleName)}] new version available: ${chalk.keyword('yellow')(
          moduleVersion,
        )} → ${chalk.keyword('orange')(moduleVersionCurrent)}`;
        if (mode === 'lerna') {
          message += `\nRun ${chalk.keyword('orange')('> git pull <')} to update cabloy!`;
          message += `\nRun ${chalk.keyword('orange')('> npm install <')} to install dependencies!`;
        } else {
          // message += `\nRun ${chalk.keyword('orange')('> npm update <')} to update cabloy!`;
          // message += `\nRun ${chalk.keyword('orange')('> npm run update:test <')} to update the test modules!`;
        }
        console.log('\n' + boxen(message, boxenOptions));
      }, 6000);
    } catch (err) {
      console.log(err);
    }
  },
  getModulePath(moduleName) {
    const moduleFile = require.resolve(`${moduleName}/package.json`);
    return path.dirname(moduleFile);
  },
  __getCabloyPath() {
    const projectPath = this.getProjectDir();
    const cabloyPath = path.join(projectPath, 'packages-cabloy/cabloy');
    if (fse.existsSync(cabloyPath)) return cabloyPath;
    return eggBornUtils.tools._getCabloyPath(projectPath);
  },
  getAppPackage() {
    const projectPath = this.getProjectDir();
    return require(path.join(projectPath, 'package.json'));
  },
  loadEnvConfig({ baseDir, env }) {
    const fileConfigDefault = path.join(baseDir, 'config/config.default.js');
    const fileConfigEnv = path.join(baseDir, `config/config.${env}.js`);
    if (!fse.existsSync(fileConfigDefault)) {
      console.log(chalk.red('Please copy directory: from _config to config\n'));
      process.exit(0);
    }
    const configDefault = require(fileConfigDefault)({});
    const configEnv = require(fileConfigEnv)({});
    return extend(true, {}, configDefault, configEnv);
  },
  getBaseDir() {
    return path.join(process.cwd(), 'dist/backend');
  },
  getProjectDir() {
    return process.cwd();
  },
  combineTestPattern({ baseDir, env, pattern }) {
    // pattern
    if (!pattern || pattern.length === 0) {
      pattern = ['src/**/test/**/*.test.ts'];
    }
    // disabledModules
    const configEnv = this.loadEnvConfig({ baseDir, env });
    const disabledModules = configEnv.disabledModules || [];
    for (const relativeName of disabledModules) {
      pattern.push(`!src/**/${relativeName}/test/**/*.test.ts`);
    }
    // disabledSuites
    const disabledSuites = configEnv.disabledSuites || [];
    for (const relativeName of disabledSuites) {
      pattern.push(`!src/**/${relativeName}/modules/*/test/**/*.test.ts`);
    }
    // cli templates
    pattern.push('!src/**/cli/templates/**/*.test.ts');
    // expand glob
    // return eggBornUtils.tools.globbySync(pattern);
    return pattern;
  },
  async prepareProjectTypes({ suites, modules }) {
    const projectPath = this.getProjectDir();
    // suites
    const imports = [];
    for (const key in suites) {
      const suite = suites[key];
      imports.push(`import '${suite.info.fullName}';`);
    }
    // modules
    for (const key in modules) {
      const module = modules[key];
      if (!module.suite) {
        imports.push(`import '${module.info.fullName}';`);
      }
    }
    // types.d.mts
    const fileTypes = path.join(projectPath, 'src/backend/config/types.d.mts');
    const contentNew = `${imports.join('\n')}\n`;
    if (fse.existsSync(fileTypes)) {
      const contentOld = (await fse.readFile(fileTypes)).toString();
      if (contentNew === contentOld) return;
    }
    await fse.outputFile(fileTypes, contentNew);
  },
  async prepareProjectTsConfig({ suites, modules }) {
    const projectPath = this.getProjectDir();
    const mode = this.getProjectMode();
    const fileTemplate = path.resolve(__dirname, `../template/_tsconfig_${mode}.json`);
    const fileConfig = path.join(projectPath, 'tsconfig.json');
    // content
    let contentOld;
    const exists = fse.existsSync(fileConfig);
    if (exists) {
      contentOld = (await fse.readFile(fileConfig)).toString();
    } else {
      contentOld = (await fse.readFile(fileTemplate)).toString();
    }
    const content = JSON.parse(contentOld);
    let references = content.references;
    // remove old
    references = references.filter(item => !['src/suite/', 'src/module/'].some(item2 => item.path.indexOf(item2) > -1));
    // append new
    // suites
    const imports = [];
    for (const key in suites) {
      const suite = suites[key];
      console.log(suite);
      imports.push(`import '${suite.info.fullName}';`);
    }
    // modules
    for (const key in modules) {
      const module = modules[key];
      if (!module.suite) {
        imports.push(`import '${module.info.fullName}';`);
      }
    }
    console.log(references);
  },
  async prepareProjectAll() {
    const projectPath = this.getProjectDir();
    // glob
    const { suites, modules } = await glob({
      projectPath,
      disabledModules: null,
      disabledSuites: null,
      log: false,
      type: 'backend',
      loadPackage: false,
    });
    await this.prepareProjectTypes({ suites, modules });
    await this.prepareProjectTsConfig({ suites, modules });
    await this.tsc();
  },
};
module.exports = utils;
