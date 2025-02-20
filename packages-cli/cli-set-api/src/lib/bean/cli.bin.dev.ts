import type { VonaMetaFlavor } from '@cabloy/module-info';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import eggBornUtils from 'egg-born-utils';
import fse from 'fs-extra';

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

  }
}
