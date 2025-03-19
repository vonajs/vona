import type { glob } from '@cabloy/module-glob';
import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type { VonaBinConfigOptions } from './toolsBin/types.ts';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { rimraf } from 'rimraf';
import { generateVonaMeta } from './toolsBin/generateVonaMeta.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    flavor?: VonaMetaFlavor;
  }
}

export class CliBinDemo extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // test
    await this._dbReset(projectPath);
  }

  async _dbReset(projectPath: string) {
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
    await this._run(projectPath, modulesMeta);
    await rimraf(path.join(projectPath, '.vona'));
  }

  async _run(projectPath: string, _modulesMeta: Awaited<ReturnType<typeof glob>>) {
    // testFile
    let testFile = path.join(import.meta.dirname, './toolsBin/dbReset.ts');
    if (!fse.existsSync(testFile)) {
      testFile = path.join(import.meta.dirname, './toolsBin/dbReset.js');
    }
    // run
    let args: string[] = [];
    args = args.concat(['--experimental-transform-types', '--loader=ts-node/esm', testFile, projectPath]);
    await this.helper.spawnExe({
      cmd: 'node',
      args,
      options: {
        cwd: projectPath,
      },
    });
  }

  _combineTestPatterns(projectPath: string, modulesMeta: Awaited<ReturnType<typeof glob>>) {
    const patterns: string[] = [];
    for (const moduleName in modulesMeta.modules) {
      const module = modulesMeta.modules[moduleName];
      const testDir = path.join(module.root, 'test');
      if (fse.existsSync(testDir)) {
        const relativePath = path.relative(projectPath, module.root);
        patterns.push(`${relativePath}/test/**/*.ts`);
      }
    }
    return patterns;
  }
}
