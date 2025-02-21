import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type { VonaBinConfigOptions } from './toolsBin/types.ts';
import { BeanCliBase } from '@cabloy/cli';
import { generateVonaMeta } from './toolsBin/generateVonaMeta.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    workers?: number;
    flavor?: VonaMetaFlavor;
  }
}

export class CliBinDev extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // run
    await this._run(projectPath);
  }

  async _run(projectPath: string) {
    const { argv } = this.context;
    const mode: VonaMetaMode = 'local';
    const flavor: VonaMetaFlavor = argv.flavor || 'normal';
    const configMeta: VonaConfigMeta = { flavor, mode };
    const configOptions: VonaBinConfigOptions = {
      appDir: projectPath,
      runtimeDir: '.vona',
      workers: argv.workers || 1,
    };
    await generateVonaMeta(configMeta, configOptions);
    await this.helper.spawn({
      cmd: 'node',
      args: ['--experimental-transform-types', '--loader=ts-node/esm', '.vona/app.ts'],
      options: {
        cwd: projectPath,
      },
    });
  }
}
