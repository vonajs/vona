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

export class CliBinDemo extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // test
    await this._demo(projectPath);
  }

  async _demo(projectPath: string) {
    const { argv } = this.context;
    const mode: VonaMetaMode = 'local';
    const flavor: VonaMetaFlavor = argv.flavor || 'normal';
    const configMeta: VonaConfigMeta = { flavor, mode };
    if (!fse.existsSync(path.join(projectPath, '.vona'))) {
      const configOptions: VonaBinConfigOptions = {
        appDir: projectPath,
        runtimeDir: '.vona',
        workers: 1,
      };
      await generateVonaMeta(configMeta, configOptions);
    }
    await this._run(projectPath);
  }

  async _run(projectPath: string) {
    // testFile
    let testFile = path.join(import.meta.dirname, './toolsBin/demo.ts');
    if (!fse.existsSync(testFile)) {
      testFile = path.join(import.meta.dirname, './toolsBin/demo.js');
    }
    // run
    let args: string[] = [];
    args = args.concat(['--experimental-transform-types', '--loader=ts-node/esm', testFile, projectPath]);
    const pos = process.argv.indexOf(':bin:demo');
    if (pos > -1) {
      args = args.concat(process.argv.slice(pos + 1));
    }
    await this.helper.spawnExe({
      cmd: 'node',
      args,
      options: {
        cwd: projectPath,
      },
    });
  }
}
