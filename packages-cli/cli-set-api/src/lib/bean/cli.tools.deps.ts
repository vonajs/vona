import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import eggBornUtils from 'egg-born-utils';
import { IModule, IModulePackage } from '@cabloy/module-info';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    tsc: boolean;
    force: boolean;
  }
}

type TypeDeps = Record<string, string>;

export class CliToolsDeps extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    const tsc = argv.tsc;
    const force = argv.force;
    // generate
    await this._generate(projectPath, tsc, force);
  }

  async _generate(projectPath: string, tsc: boolean, force: boolean) {
    // generate package.json
    await this._generatePackageJson(projectPath);
    // generate type modules file
    await this._generateTypeModulesFile(projectPath, force);
    // generate type project file
    await this._generateTypeProjectFile(projectPath);
    // tsc
    if (tsc) {
      await this._tsc();
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
    const pkgOriginal = await this.helper.loadJSONFile(pkgOriginalFile);
    if (fse.existsSync(pkgFile)) {
      const pkg = await this.helper.loadJSONFile(pkgFile);
      // save back
      await this._generatePackageJson_saveBack(pkg, pkgOriginal, pkgOriginalFile, deps, depsDev);
    }
    // generate pkg from pkgOriginal
    await this._generatePackageJson_pkgFromPkgOriginal(pkgOriginal, pkgFile, deps, depsDev);
  }

  async _generatePackageJson_prepareDeps(_projectPath: string) {
    const deps: TypeDeps = {};
    const depsDev: TypeDeps = {};
    // all modules
    this.modulesMeta.modulesArray.forEach(module => {
      const onlyDev = _checkIfModuleOnlyDev(module);
      const version = module.info.node_modules ? '^' + module.package.version : 'workspace:^';
      if (onlyDev) {
        depsDev[module.package.name] = version;
      } else {
        deps[module.package.name] = version;
      }
    });
    // all globalDependencies of modules
    this.modulesMeta.modulesArray.forEach(module => {
      _collectModuleDevs(module, deps, 'dependencies', 'globalDependencies');
      _collectModuleDevs(module, depsDev, 'devDependencies', 'globalDependenciesDev');
    });
    return { deps, depsDev };
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
    // content
    let contentOld;
    const exists = fse.existsSync(fileConfig);
    if (exists) {
      contentOld = (await fse.readFile(fileConfig)).toString();
    } else {
      contentOld = (await fse.readFile(fileTemplate)).toString();
    }
    const content = JSON.parse(contentOld);
    const referencesOld = content.references;
    // remove old
    const referencesNew = referencesOld.filter(
      item =>
        !['src/suite/', 'src/module/', 'src/suite-vendor/', 'src/module-vendor/'].some(
          item2 => item.path.indexOf(item2) > -1,
        ),
    );
    //
    if (exists && JSON.stringify(referencesNew, null, 2) === JSON.stringify(referencesOld, null, 2)) return;
    const contentNew = { ...content, references: referencesNew };
    await fse.outputFile(fileConfig, JSON.stringify(contentNew, null, 2));
  }

  async _generateTypeModulesFile(projectPath: string, force: boolean) {
    const typeFile = path.join(projectPath, 'src/backend/typing/modules.d.ts');
    let content = '';
    // // all suites
    // for (const key in this.modulesMeta.suites) {
    //   const suite = this.modulesMeta.suites[key];
    //   content += `import '${suite.package.name}';\n`;
    // }
    // all modules
    this.modulesMeta.modulesArray.forEach(module => {
      content += `import '${module.package.name}';\n`;
    });
    await fse.writeFile(typeFile, content);
    // all modules: type file
    for (const module of this.modulesMeta.modulesArray) {
      if (module.info.node_modules) continue;
      const moduleTypeFile = path.join(module.root, 'src/.metadata/modules.d.ts');
      if (force || !fse.existsSync(moduleTypeFile)) {
        await fse.ensureLink(typeFile, moduleTypeFile);
      }
    }
  }

  async _generatePackageJson_pkgFromPkgOriginal(
    pkgOriginal: IModulePackage,
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
    await this.helper.saveJSONFile(pkgFile, pkgOriginal);
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
      await this.helper.saveJSONFile(pkgOriginalFile, pkgOriginal);
    }
  }

  async _tsc() {
    await this.helper.processHelper.tsc();
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
