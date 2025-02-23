import type { glob } from '@cabloy/module-glob';
import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type { VonaBinConfigOptions } from './toolsBin/types.ts';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { generateVonaMeta } from './toolsBin/generateVonaMeta.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    flavor?: VonaMetaFlavor;
  }
}

export class CliBinTest extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // test
    await this._test(projectPath);
  }

  async _test(projectPath: string) {
    const { argv } = this.context;
    const mode: VonaMetaMode = 'test';
    const flavor: VonaMetaFlavor = argv.flavor || 'normal';
    const configMeta: VonaConfigMeta = { flavor, mode };
    const configOptions: VonaBinConfigOptions = {
      appDir: projectPath,
      runtimeDir: '.vona',
      workers: argv.workers,
    };
    const { modulesMeta } = await generateVonaMeta(configMeta, configOptions);
    await this._run(projectPath, modulesMeta);
  }

  async _run(projectPath: string, _modulesMeta: Awaited<ReturnType<typeof glob>>) {
    let testFile = path.join(import.meta.dirname, './toolsBin/test.ts');
    if (!fse.existsSync(testFile)) {
      testFile = path.join(import.meta.dirname, './toolsBin/test.js');
    }
    await this.helper.spawnExe({
      cmd: 'node',
      args: ['--experimental-transform-types', '--loader=ts-node/esm', testFile, projectPath, 'ssss'],
      options: {
        cwd: projectPath,
      },
    });
  }
}
