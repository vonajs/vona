import type { IModule, IModulePackage } from '@cabloy/module-info';
import type { Stats } from 'fs-extra';
import type { BeanCliBase } from './bean.cli.base.ts';
import path from 'node:path';
import fse from 'fs-extra';

type TypeDeps = Record<string, string>;

export class LocalCommon {
  cli: BeanCliBase;

  constructor(cli) {
    this.cli = cli;
  }

  async _generateTypeModulesFile(projectPath: string) {
    const pathName = this.cli.context.brandName === 'zova' ? 'front' : 'backend';
    const typeFile = path.join(projectPath, `src/${pathName}/typing/modules.d.ts`);
    let content = '';
    // // all suites
    // for (const key in this.modulesMeta.suites) {
    //   const suite = this.modulesMeta.suites[key];
    //   content += `import '${suite.package.name}';\n`;
    // }
    // all modules
    this.cli.modulesMeta.modulesArray.forEach(module => {
      content += `import '${module.package.name}';\n`;
    });
    await fse.writeFile(typeFile, content);
    const typeFileStat = await fse.stat(typeFile);
    // all modules: type file
    const promises: Promise<void>[] = [];
    for (const module of this.cli.modulesMeta.modulesArray) {
      if (module.info.node_modules) continue;
      const moduleTypeFile = path.join(module.root, 'src/.metadata/modules.d.ts');
      promises.push(this._generateTypeModulesFileInner(typeFile, typeFileStat, moduleTypeFile));
    }
    await Promise.all(promises);
  }

  async _generateTypeModulesFileInner(typeFile: string, typeFileStat: Stats, moduleTypeFile: string) {
    const win = process.platform.startsWith('win');
    let needCreate = true;
    const exists = await fse.exists(moduleTypeFile);
    if (exists) {
      try {
        if (win) {
          const stat = await fse.stat(moduleTypeFile);
          if (stat.size === typeFileStat.size) {
            needCreate = false;
          }
        } else {
          const realFile = await fse.readlink(moduleTypeFile);
          if (realFile === typeFile) {
            needCreate = false;
          }
        }
      } catch (_err) {}
    }
    if (needCreate) {
      await fse.remove(moduleTypeFile);
      if (win) {
        await fse.copy(typeFile, moduleTypeFile);
      } else {
        await fse.ensureSymlink(typeFile, moduleTypeFile);
      }
    }
  }

  async _generatePackageJson(projectPath: string) {
    const pkgFile = path.join(projectPath, 'package.json');
    const pkgOriginalFile = path.join(projectPath, 'package.original.json');
    // check original
    if (!fse.existsSync(pkgOriginalFile)) {
      await fse.copyFile(pkgFile, pkgOriginalFile);
    }
    // prepare deps
    const { deps, depsDev } = await this._generatePackageJson_prepareDeps(projectPath);
    // pkg/pkgOriginal
    const pkgOriginal = await this.cli.helper.loadJSONFile(pkgOriginalFile);
    let pkg: IModulePackage | undefined;
    if (fse.existsSync(pkgFile)) {
      pkg = await this.cli.helper.loadJSONFile(pkgFile);
      // save back
      await this._generatePackageJson_saveBack(pkg!, pkgOriginal, pkgOriginalFile, deps, depsDev);
    }
    // generate pkg from pkgOriginal
    await this._generatePackageJson_pkgFromPkgOriginal(pkgOriginal, pkg, pkgFile, deps, depsDev);
  }

  async _generatePackageJson_prepareDeps(_projectPath: string) {
    const deps: TypeDeps = {};
    const depsDev: TypeDeps = {};
    // all modules
    this.cli.modulesMeta.modulesArray.forEach(module => {
      const onlyDev = _checkIfModuleOnlyDev(module);
      const version = module.info.node_modules ? `^${module.package.version}` : 'workspace:^';
      if (onlyDev) {
        depsDev[module.package.name] = version;
      } else {
        deps[module.package.name] = version;
      }
    });
    // all globalDependencies of modules
    this.cli.modulesMeta.modulesArray.forEach(module => {
      _collectModuleDevs(module, deps, 'dependencies', 'globalDependencies');
      _collectModuleDevs(module, depsDev, 'devDependencies', 'globalDependenciesDev');
    });
    return { deps, depsDev };
  }

  async _generatePackageJson_pkgFromPkgOriginal(
    pkgOriginal: IModulePackage,
    pkg: IModulePackage | undefined,
    pkgFile: string,
    deps: TypeDeps,
    depsDev: TypeDeps,
  ) {
    function _handleDeps(nameDependencies: string, deps: TypeDeps) {
      for (const key in deps) {
        const version = deps[key];
        if (!pkgOriginal[nameDependencies][key]) {
          pkgOriginal[nameDependencies][key] = version;
        }
      }
    }
    _handleDeps('dependencies', deps);
    _handleDeps('devDependencies', depsDev);
    //
    const strPkgOriginal = `${JSON.stringify(pkgOriginal, null, 2)}\n`;
    const strPkg = pkg ? `${JSON.stringify(pkg, null, 2)}\n` : '';
    if (strPkgOriginal !== strPkg) {
      await fse.writeFile(pkgFile, strPkgOriginal);
    }
  }

  async _generatePackageJson_saveBack(
    pkg: IModulePackage,
    pkgOriginal: IModulePackage,
    pkgOriginalFile: string,
    deps: TypeDeps,
    depsDev: TypeDeps,
  ) {
    let changed = false;
    for (const key of ['version', 'gitHead']) {
      if (pkgOriginal[key] !== pkg[key]) {
        pkgOriginal[key] = pkg[key];
        changed = true;
      }
    }
    function _handleDeps(nameDependencies: string, deps: TypeDeps) {
      const moduleDeps = pkg[nameDependencies];
      const moduleDepsOriginal = pkgOriginal[nameDependencies];
      for (const key in moduleDeps) {
        const version = moduleDeps[key];
        if (moduleDepsOriginal[key] && moduleDepsOriginal[key] === version) continue;
        const isModule = key.includes('vona-module-') || key.includes('zova-module-');
        const isModuleWorkspace = isModule && version.startsWith('workspace:');
        if (isModuleWorkspace) continue;
        if (deps[key] && !isModule) continue;
        moduleDepsOriginal[key] = version;
        changed = true;
      }
    }
    _handleDeps('dependencies', deps);
    _handleDeps('devDependencies', depsDev);
    if (changed) {
      await this.cli.helper.saveJSONFile(pkgOriginalFile, pkgOriginal);
    }
  }
}

function _checkIfModuleOnlyDev(module: IModule) {
  const meta = module.package.vonaModule?.capabilities?.meta || module.package.zovaModule?.capabilities?.meta;
  if (!meta || !meta.mode) return false;
  const modes = Array.isArray(meta.mode) ? meta.mode : [meta.mode];
  return !modes.some(mode => ['prod', 'production'].includes(mode));
}

function _collectModuleDevs(module: IModule, deps: {}, nameDependencies: string, nameGlobalDependencies: string) {
  const moduleDeps = module.package[nameDependencies];
  const globalDependencies =
    module.package.vonaModule?.[nameGlobalDependencies] || module.package.zovaModule?.[nameGlobalDependencies];
  if (globalDependencies) {
    for (const key in globalDependencies) {
      let version = globalDependencies[key];
      if (version !== false) {
        if (version === true) version = moduleDeps[key];
        deps[key] = version;
      }
    }
  }
  return deps;
}
