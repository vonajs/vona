import { __ThisModule__ } from '../resource/this.js';
import { Local, BeanBase } from '@cabloy/core';

import Chalk from 'chalk';
import TableClass from 'cli-table3';
import Boxen from 'boxen';
import fse from 'fs-extra';
const mparse = require('@cabloy/module-parse').default;
const { ProcessHelper } = require('@cabloy/process-helper');

@Local()
export class LocalHelper extends BeanBase {
  cli: any;
  ProcessHelper: any;

  constructor(cli) {
    super();
    this.cli = cli;
    this.ProcessHelper = new ProcessHelper(this.cwd, this.console);
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
    return this.ctx.config.module(__ThisModule__);
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

  newChalk(options) {
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
  parseModuleInfo(moduleName) {
    const moduleInfo = mparse.parseInfo(moduleName);
    if (!moduleInfo) throw new Error(`module name is not valid: ${moduleName}`);
    return moduleInfo;
  }
  findModule(moduleName) {
    const moduleInfo = this.parseModuleInfo(moduleName);
    return this.ctx.app.meta.modules[__ThisModule__];
  }
  parseSuiteInfo(suiteName) {
    const suiteInfo = mparse.parseInfo(suiteName, 'suite');
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
