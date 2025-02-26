import type { glob } from '@cabloy/module-glob';
import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type { VonaBinConfigOptions } from './toolsBin/types.ts';
import { BeanCliBase } from '@cabloy/cli';
import nodemon from 'nodemon';
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
    await this._dev(projectPath);
  }

  async _dev(projectPath: string) {
    const { argv } = this.context;
    const mode: VonaMetaMode = 'local';
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
    return new Promise((resolve, _reject) => {
      (nodemon as any)({
        script: '.vona/app.ts',
        cwd: projectPath,
        exec: 'node',
        execArgs: ['--experimental-transform-types', '--loader=ts-node/esm'],
      });
      nodemon.on('quit', () => {
        resolve(undefined);
      });
    });
    // await this.helper.spawnExe({
    //   cmd: 'node',
    //   args: ['--experimental-transform-types', '--loader=ts-node/esm', '.vona/app.ts'],
    //   options: {
    //     cwd: projectPath,
    //   },
    // });
  }
}
