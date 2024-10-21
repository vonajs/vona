const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const boxen = require('boxen');
const eggBornUtils = require('egg-born-utils');
const { ProcessHelper } = require('@cabloy/process-helper');
const { glob } = require('@cabloy/module-glob');
const { loadEnvs } = require('@cabloy/dotenv');
const { ensureArray } = require('@cabloy/ensure-array');

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
  getProjectMode() {
    const vonaPath = this.__getVonaPath();
    return vonaPath.indexOf('packages-vona') > -1 ? 'source' : 'project';
  },
  getModulePath(moduleName) {
    const moduleFile = require.resolve(`${moduleName}/package.json`);
    return path.dirname(moduleFile);
  },
  __getVonaPath() {
    const projectPath = this.getProjectDir();
    const cabloyPath = path.join(projectPath, 'packages-vona/vona');
    if (fse.existsSync(cabloyPath)) return cabloyPath;
    return eggBornUtils.tools._getCabloyPath(projectPath);
  },
  getAppPackage() {
    const projectPath = this.getProjectDir();
    return require(path.join(projectPath, 'package.json'));
  },
  loadEnvAndConfig({ baseDir, env }) {
    // load envs
    const meta = { serverEnv: env, mine: 'mine' };
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
  combineTestPattern({ baseDir, env, pattern }) {
    // pattern
    if (!pattern || pattern.length === 0) {
      pattern = ['src/**/test/**/*.test.ts'];
    }
    // disabledModules
    this.loadEnvAndConfig({ baseDir, env });
    const disabledModules = ensureArray(process.env.Project_Disabled_Modules);
    for (const relativeName of disabledModules) {
      pattern.push(`!src/**/${relativeName}/test/**/*.test.ts`);
    }
    // disabledSuites
    const disabledSuites = ensureArray(process.env.Project_Disabled_Suites);
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
  async prepareProjectTsConfig({ suites, modules, env }) {
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
    const referencesOld = content.references;
    // remove old
    const referencesNew = referencesOld.filter(
      item => !['src/suite/', 'src/module/'].some(item2 => item.path.indexOf(item2) > -1),
    );
    // append new
    if (!['unittest', 'local'].includes(env)) {
      // suites
      for (const key in suites) {
        const suite = suites[key];
        if (!suite.info.vendor) {
          referencesNew.push({ path: `src/suite/${suite.info.originalName}` });
        }
      }
      // modules
      for (const key in modules) {
        const module = modules[key];
        if (!module.suite && !module.info.vendor) {
          referencesNew.push({ path: `src/module/${module.info.originalName}/tsconfig.build.json` });
        }
      }
    }
    //
    if (exists && JSON.stringify(referencesNew, null, 2) === JSON.stringify(referencesOld, null, 2)) return;
    const contentNew = { ...content, references: referencesNew };
    await fse.outputFile(fileConfig, JSON.stringify(contentNew, null, 2));
  },
  async prepareProjectAll({ env }) {
    const projectPath = this.getProjectDir();
    // glob
    const { suites, modules } = await glob({
      projectMode: 'vona',
      projectPath,
      disabledModules: undefined,
      disabledSuites: undefined,
      log: false,
    });
    await this.prepareProjectTypes({ suites, modules });
    await this.prepareProjectTsConfig({ suites, modules, env });
    await this.tsc();
  },
};
module.exports = utils;
