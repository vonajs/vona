import type { IModuleInfo } from '@cabloy/module-info';
import fs from 'node:fs';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import { getOnionMetasMeta, getOnionScenesMeta } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    sceneName: string;
    sceneNameCapitalize: string;
    beanName: string;
    beanNameCapitalize: string;
    moduleResourceName: string;
    boilerplate: string;
  }
}

let __snippetsPathPrefix: string | undefined;

export class CliCreateBean extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // noformat
    argv.noformat = true;
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
    // scene name
    const sceneName = argv.sceneName;
    argv.sceneNameCapitalize = this.helper.firstCharToUpperCase(sceneName);
    // scene meta
    // onionScenesMeta
    const onionScenesMeta = getOnionScenesMeta(this.modulesMeta.modules);
    const onionSceneMeta = onionScenesMeta[sceneName];
    // bean name
    const beanName = argv.beanName;
    argv.beanNameCapitalize = this.helper.firstCharToUpperCase(beanName);
    // moduleResourceName
    argv.moduleResourceName = this.helper.combineModuleNameAndResource(argv.moduleInfo.relativeName, argv.beanName);
    // directory
    const beanDir = path.join(targetDir, onionSceneMeta.sceneIsolate ? `src/${sceneName}` : 'src/bean');
    const beanFile = path.join(beanDir, onionSceneMeta.sceneIsolate ? `${beanName}.ts` : `${sceneName}.${beanName}.ts`);
    if (fs.existsSync(beanFile)) {
      throw new Error(`${sceneName} bean exists: ${beanName}`);
    }
    await this.helper.ensureDir(beanDir);
    // snippets/boilerplate
    const snippets = this._getBoilerplatesOrSnippets('snippets');
    const boilerplates = this._getBoilerplatesOrSnippets('boilerplate', argv.boilerplate);
    const snippetsName = snippets[`${sceneName}:${argv.beanName}`] || snippets[sceneName];
    const boilerplateName = boilerplates[`${sceneName}:${argv.beanName}`] || boilerplates[sceneName];
    // render
    await this.template.renderBoilerplateAndSnippets({
      targetDir: beanDir,
      setName: __ThisSetName__,
      snippetsPath: snippetsName,
      boilerplatePath: boilerplateName,
    });
    // tools.metadata
    if (!argv.nometadata) {
      await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
    }
  }

  private _getBoilerplatesOrSnippets(type: 'boilerplate' | 'snippets', custom?: string) {
    const type2 = custom ? `${type}${toUpperCaseFirstChar(custom)}` : type;
    const result = {};
    // scenes
    const onionScenesMeta = getOnionScenesMeta(this.modulesMeta.modules);
    for (const sceneName in onionScenesMeta) {
      const onionSceneMeta = onionScenesMeta[sceneName];
      const scenePath = onionSceneMeta[type2];
      if (scenePath) {
        result[sceneName] = this._combineBoilerplatesOrSnippetsPath(type, onionSceneMeta.module!.root, scenePath);
      }
    }
    // metas
    const onionMetasMeta = getOnionMetasMeta(this.modulesMeta.modules);
    for (const sceneName in onionMetasMeta) {
      const onionMetaMeta = onionMetasMeta[sceneName];
      const scenePath = onionMetaMeta[type2];
      if (scenePath) {
        result[`meta:${sceneName}`] = this._combineBoilerplatesOrSnippetsPath(type, onionMetaMeta.module!.root, scenePath);
      }
    }
    return result;
  }

  private _combineBoilerplatesOrSnippetsPath(type: 'boilerplate' | 'snippets', moduleRoot: string, scenePath: string) {
    // boilerplate
    if (type === 'boilerplate') {
      return path.join(moduleRoot, 'cli', scenePath);
    }
    // snippets
    if (__snippetsPathPrefix) {
      return path.join(moduleRoot, __snippetsPathPrefix, scenePath);
    }
    let snippetsPath = path.join(moduleRoot, 'dist-cli', scenePath);
    if (!fse.existsSync(snippetsPath)) {
      snippetsPath = path.join(moduleRoot, 'cli', scenePath);
      __snippetsPathPrefix = 'cli';
    } else {
      __snippetsPathPrefix = 'dist-cli';
    }
    return snippetsPath;
  }
}
