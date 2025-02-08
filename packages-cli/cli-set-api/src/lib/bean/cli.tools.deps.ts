import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import eggBornUtils from 'egg-born-utils';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    tsc: boolean;
    force: boolean;
  }
}

export class CliToolsDeps extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    const tsc = argv.tsc;
    // generate
    await this._generate(projectPath, tsc);
  }

  async _generate(projectPath: string, tsc: boolean) {
    // generate package.json
    await this.common._generatePackageJson(projectPath);
    // generate type modules file
    await this.common._generateTypeModulesFile(projectPath);
    // generate type project file
    await this._generateTypeProjectFile(projectPath);
    // tsc
    if (tsc) {
      await this._tsc();
    }
  }

  _getProjectMode(projectPath: string) {
    const vonaPath = this._getVonaPath(projectPath);
    return vonaPath.indexOf('packages-vona') > -1 ? 'source' : 'project';
  }

  _getVonaPath(projectPath: string) {
    return eggBornUtils.tools._getVonaPath(projectPath);
  }

  _resolveTemplatePath(file: string) {
    return new URL(path.join('../../../templates', file), import.meta.url);
  }

  async _generateTypeProjectFile(projectPath: string) {
    const projectMode = this._getProjectMode(projectPath);
    const fileTemplate = this._resolveTemplatePath(`_tsconfig_${projectMode}.json`);
    const fileConfig = path.join(projectPath, 'tsconfig.json');
    if (!fse.existsSync(fileConfig)) {
      await fse.copyFile(fileTemplate, fileConfig);
    }
  }

  async _tsc() {
    await this.helper.processHelper.tsc();
  }
}
