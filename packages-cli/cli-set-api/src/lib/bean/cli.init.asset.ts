import type { IModuleInfo } from '@cabloy/module-info';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    scene: string;
  }
}

export class CliInitAsset extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // module name/info
    const moduleName = argv.module;
    argv.moduleInfo = this.helper.parseModuleInfo(moduleName);
    // check if exists
    const _module = this.helper.findModule(moduleName);
    if (!_module) {
      throw new Error(`module does not exist: ${moduleName}`);
    }
    // target dir
    const targetDir = await this.helper.ensureDir(_module.root);
    // scene
    const scene = argv.scene;
    // directory
    const assetDir = path.join(targetDir, scene);
    if (fse.existsSync(assetDir)) {
      throw new Error(`asset exists: ${moduleName}/${scene}`);
    }
    // package.json
    await this._setPackageInfo(targetDir, scene);
  }

  async _setPackageInfo(modulePath: string, scene: string) {
    const pkgFile = path.join(modulePath, 'package.json');
    const pkg = await this.helper.loadJSONFile(pkgFile);
    if (!pkg.files) pkg.files = [];
    let changed: boolean | undefined;
    // files
    if (!pkg.files.includes(scene)) {
      pkg.files.push(scene);
      changed = true;
    }
    // save
    if (changed) {
      await this.helper.saveJSONFile(pkgFile, pkg);
    }
  }
}
