import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import eggBornUtils from 'egg-born-utils';
import fse from 'fs-extra';
import { resolveTemplatePath } from '../utils.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
  }
}

export class CliToolsDeps extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // generate
    await this._generate(projectPath);
  }

  async _generate(projectPath: string) {
    // generate package.json
    await this.common._generatePackageJson(projectPath);
    // generate type modules file
    await this.common._generateTypeModulesFile(projectPath);
    // generate type project file
    await this._generateTypeProjectFile(projectPath);
  }

  _getProjectMode(projectPath: string) {
    const vonaPath = this._getVonaPath(projectPath);
    return vonaPath.includes('packages-vona') ? 'source' : 'project';
  }

  _getVonaPath(projectPath: string) {
    return eggBornUtils.tools._getVonaPath(projectPath);
  }

  async _generateTypeProjectFile(projectPath: string) {
    const projectMode = this._getProjectMode(projectPath);
    const fileTemplate = resolveTemplatePath(`config/_tsconfig_${projectMode}.json`);
    const fileConfig = path.join(projectPath, 'tsconfig.json');
    if (!fse.existsSync(fileConfig)) {
      await fse.copyFile(fileTemplate, fileConfig);
    }
  }
}
