import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { VonaConfigMetaMode } from 'vona-shared';
import eggBornUtils from 'egg-born-utils';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    force: boolean;
    mode: VonaConfigMetaMode;
  }
}

export class CliToolsDeps extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    const force = argv.force;
    const mode = argv.mode || 'local';
    // generate
    await this._generate(projectPath, mode, force);
  }

  async _generate(projectPath: string, mode: VonaConfigMetaMode, force: boolean) {
    const pkgFile = path.join(projectPath, 'package.json');
    const pkgOriginalFile = path.join(projectPath, 'package.original.json');
    // check original
    if (!fse.existsSync(pkgOriginalFile)) {
      await fse.copyFile(pkgFile, pkgOriginalFile);
    }
    // pkg/pkgOriginal
    const pkgOriginal = await this.helper.loadJSONFile(pkgOriginalFile);
    if (fse.existsSync(pkgFile)) {
      const pkg = await this.helper.loadJSONFile(pkgFile);
      // save back versions
      await this._saveBackVersions(pkg, pkgOriginal, pkgOriginalFile);
    }
    // generate pkg from pkgOriginal
    await this._generatePkgFromPkgOriginal(pkgOriginal, pkgFile);
    // generate type modules file
    await this._generateTypeModulesFile(projectPath, force);
    // generate type project file
    await this._generateTypeProjectFile(projectPath, mode);
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

  async _generateTypeProjectFile(projectPath: string, mode: VonaConfigMetaMode) {
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
      item => !['src/suite/', 'src/module/'].some(item2 => item.path.indexOf(item2) > -1),
    );
    // append new for prod build
    if (mode === 'prod') {
      // suites
      for (const key in this.modulesMeta.suites) {
        const suite = this.modulesMeta.suites[key];
        referencesNew.push({ path: `src/suite${suite.info.vendor ? '-vendor' : ''}/${suite.info.originalName}` });
      }
      // modules
      this.modulesMeta.modulesArray.forEach(module => {
        if (!module.suite) {
          referencesNew.push({
            path: `src/module${module.info.vendor ? '-vendor' : ''}/${module.info.originalName}`,
          });
        }
      });
    }
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

  async _generatePkgFromPkgOriginal(pkgOriginal, pkgFile) {
    const depsOriginal = pkgOriginal.dependencies;
    // // all modules
    // this.modulesMeta.modulesArray.forEach(module => {
    //   if (!depsOriginal[module.package.name]) {
    //     const version = module.info.node_modules ? '^' + module.package.version : 'workspace:^';
    //     depsOriginal[module.package.name] = version;
    //   }
    // });
    // all globalDependencies of modules
    this.modulesMeta.modulesArray.forEach(module => {
      const deps = module.package.dependencies;
      const globalDependencies = module.package.vonaModule?.globalDependencies;
      if (globalDependencies) {
        for (const key in globalDependencies) {
          let version = globalDependencies[key];
          if (version !== false && !depsOriginal[key]) {
            if (version === true) version = deps[key];
            depsOriginal[key] = version;
          }
        }
      }
    });
    await this.helper.saveJSONFile(pkgFile, pkgOriginal);
  }

  async _saveBackVersions(pkg, pkgOriginal, pkgOriginalFile) {
    let changed = false;
    for (const key of ['version', 'gitHead']) {
      if (pkgOriginal[key] !== pkg[key]) {
        pkgOriginal[key] = pkg[key];
        changed = true;
      }
    }
    for (const field of ['dependencies', 'devDependencies']) {
      const fieldObj = pkg[field];
      const fieldObjOriginal = pkgOriginal[field];
      for (const key in fieldObjOriginal) {
        if (fieldObjOriginal[key] !== fieldObj[key]) {
          fieldObjOriginal[key] = fieldObj[key];
          changed = true;
        }
      }
    }
    if (changed) {
      await this.helper.saveJSONFile(pkgOriginalFile, pkgOriginal);
    }
  }
}
