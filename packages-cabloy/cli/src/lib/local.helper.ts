import Chalk from 'chalk';
import TableClass from 'cli-table3';
import Boxen from 'boxen';
import fse from 'fs-extra';
import { glob } from '@cabloy/module-glob';
import * as ModuleInfo from '@cabloy/module-info';
import { ProcessHelper } from '@cabloy/process-helper';
import { config } from '../config.js';
import { BeanCliBase } from './virtual.cliBase.js';

export class LocalHelper {
  cli: BeanCliBase;
  ProcessHelper: any;
  modulesMeta: Awaited<ReturnType<typeof glob>>;

  constructor(cli) {
    this.cli = cli;
    this.ProcessHelper = new ProcessHelper(this.cwd, this.console);
  }

  async getModulesMeta() {
    // all modules
    this.modulesMeta = await glob({
      projectPath: this.cli.path.join(app.options.baseDir, '../..'),
      disabledModules: app.config.disabledModules,
      disabledSuites: app.config.disabledSuites,
      log: !!app.meta.inAgent,
      projectMode: 'api',
      loadPackage: true,
    });
  }

  get options() {
    return this.cli.options;
  }

  get context() {
    return this.cli.options.context;
  }

  get console() {
    return this.cli.console;
  }

  get template() {
    return this.cli.template;
  }

  get moduleConfig() {
    return config;
  }
  get chalk() {
    return this.newChalk();
  }
  get Table() {
    return TableClass;
  }
  get cwd() {
    return this.context.cwd;
  }

  newChalk(options?) {
    if (!options) {
      options = this.moduleConfig.helper.chalk.options;
    }
    return new Chalk.Instance(options);
  }
  newTable(options) {
    return new TableClass(options);
  }
  boxen({ text, options }: any) {
    if (!options) {
      options = this.moduleConfig.helper.boxen.options;
    }
    return Boxen(text, options);
  }
  relativeNameToCapitalize(moduleName: string): string {
    return moduleName
      .split('-')
      .map(name => {
        return name.charAt(0).toUpperCase() + name.substring(1);
      })
      .join('');
  }
  parseModuleInfo(moduleName) {
    const moduleInfo = ModuleInfo.parseInfoPro(moduleName, 'api', 'module');
    if (!moduleInfo) throw new Error(`module name is not valid: ${moduleName}`);
    return moduleInfo;
  }
  findModule(moduleName) {
    const moduleInfo = this.parseModuleInfo(moduleName);
    return this.ctx.app.meta.modules[moduleInfo.relativeName];
  }
  parseSuiteInfo(suiteName) {
    const suiteInfo = ModuleInfo.parseInfoPro(suiteName, 'api', 'suite');
    if (!suiteInfo) throw new Error(`suite name is not valid: ${suiteName}`);
    return suiteInfo;
  }
  findSuite(suiteName) {
    const suiteInfo = this.parseSuiteInfo(suiteName);
    return this.ctx.app.meta.suites[suiteInfo.relativeName];
  }
  async ensureDir(dir) {
    await fse.ensureDir(dir);
    return dir;
  }
  getNpmRegistry() {
    let registry = this.cli.terminal ? this.context.env.npm_config_registry : null;
    if (!registry) {
      const locale = this.ctx.locale === 'zh-cn' ? 'zh-cn' : 'en-us';
      registry = this.moduleConfig.helper.lerna.registry.locales[locale];
    }
    return registry;
  }
  async pnpmInstall() {
    // args
    const args = ['install', '--force'];
    // log
    await this.console.log(`===> pnpm install --force`);
    // spawn
    await this.spawnCmd({
      cmd: 'pnpm',
      args,
    });
  }
  async lernaBootstrap() {
    // args
    const args = ['install'];
    // registry
    const registry = this.getNpmRegistry();
    const registryOption = registry ? `--registry=${registry}` : '';
    if (registryOption) {
      args.push(registryOption);
    }
    // log
    await this.console.log(`===> npm install ${registryOption}`);
    // spawn
    await this.spawnCmd({
      cmd: 'npm',
      args,
    });
  }
  async formatFile({ fileName, logPrefix }: any) {
    return await this.ProcessHelper.formatFile({ fileName, logPrefix });
  }
  async spawnBin({ cmd, args, options }: any) {
    return await this.ProcessHelper.spawnBin({ cmd, args, options });
  }
  async spawnCmd({ cmd, args, options }: any) {
    return await this.ProcessHelper.spawnCmd({ cmd, args, options });
  }
  async spawnExe({ cmd, args, options }: any) {
    return await this.ProcessHelper.spawnExe({ cmd, args, options });
  }
  async spawn({ cmd, args = [], options = {} }) {
    return await this.ProcessHelper.spawn({ cmd, args, options });
  }
  async gitCommit({ cwd, message }: any) {
    return await this.ProcessHelper.gitCommit({ cwd, message });
  }
}
