import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';

import { BeanCliBase } from '@cabloy/cli';

import type { VonaBinConfigOptions } from './toolsBin/types.ts';

import { generateVonaMeta } from './toolsBin/generateVonaMeta.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliBinTsc extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    const force = argv.force;
    await this._tsc(projectPath, force);
  }

  async _tsc(projectPath: string, force: boolean) {
    const { argv } = this.context;
    const mode: VonaMetaMode = 'test';
    const flavor: VonaMetaFlavor = argv.flavor || 'normal';
    const configMeta: VonaConfigMeta = { flavor, mode };
    const configOptions: VonaBinConfigOptions = {
      appDir: projectPath,
      runtimeDir: '.vona',
      workers: 1,
    };
    const { modulesMeta } = await generateVonaMeta(configMeta, configOptions);
    const suiteNames = Object.keys(modulesMeta.suites).filter(suiteName => !modulesMeta.suites[suiteName].info.node_modules);
    const modulesArray = modulesMeta.modulesArray.filter(item => !item.suite && !item.info.node_modules);
    // count
    const count = 1 + suiteNames.length + modulesArray.length;
    // begin
    let counter = 0;
    const timeBegin = Date.now();
    // eslint-disable-next-line
    console.log('===> build begin');
    // args
    const tscArgs = ['-b'];
    if (force) {
      tscArgs.push('--force');
    }
    // tsc: project
    // eslint-disable-next-line
    console.log(`===>  ${++counter}/${count} project`);
    await this.helper.processHelper.tsc(tscArgs, { cwd: projectPath });
    // suites
    for (const key of suiteNames) {
      const suite = modulesMeta.suites[key];
      // eslint-disable-next-line
      console.log(`===>  ${++counter}/${count} suite: ${suite.info.originalName}`);
      await this.helper.processHelper.tsc(tscArgs, { cwd: suite.root });
    }
    // modules
    for (const module of modulesArray) {
      // eslint-disable-next-line
      console.log(`===>  ${++counter}/${count} module: ${module.info.originalName}`);
      await this.helper.processHelper.tsc(tscArgs, { cwd: module.root });
    }
    // end
    const timeEnd = Date.now();
    // eslint-disable-next-line
    console.log(`===> tsc end: ${(timeEnd - timeBegin) / 1000}s`);
  }
}
