import type { GenerateScopeOptions } from './toolsMetadata/generateScope.ts';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import { getOnionMetasMeta, getOnionScenesMeta } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import { loadJSONFile, saveJSONFile } from '../utils.ts';
import { generateBeanGenerals } from './toolsMetadata/generateBeanGenerals.ts';
import { generateConfig, generateConstant, generateError, generateLocale1, generateLocale2 } from './toolsMetadata/generateConfig.ts';
import { generateMetadataCustom } from './toolsMetadata/generateMetadataCustom.ts';
import { generateMain, generateMonkey } from './toolsMetadata/generateMonkey.ts';
import { generateOnions } from './toolsMetadata/generateOnions.ts';
import { generateScope } from './toolsMetadata/generateScope.ts';
import { generateScopeResources } from './toolsMetadata/generateScopeResources.ts';
import { generateScopeResourcesMeta } from './toolsMetadata/generateScopeResourcesMeta.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliToolsMetadata extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // noformat: src/index.ts need format
    // argv.noformat = true;
    // moduleNames
    let moduleNames = argv._;
    const force = argv.force ?? moduleNames.length > 0;
    if (moduleNames.length === 0) {
      moduleNames = this.modulesMeta.modulesArray
        .filter(item => !item.info.node_modules)
        .map(item => item.info.relativeName);
    }
    const total = moduleNames.length;
    for (let index = 0; index < total; index++) {
      const moduleName = moduleNames[index];
      // log
      await this.console.log({
        total,
        progress: index,
        text: moduleName,
      });
      // generate res
      await this._generateMetadata(moduleName, force);
    }
  }

  async _generateMetadata(moduleName: string, force: boolean) {
    const module = this.helper.findModule(moduleName);
    if (!module) throw new Error(`module not found: ${moduleName}`);
    const modulePath = module.root;
    const metaDir = path.join(modulePath, 'src/.metadata');
    const metaIndexFile = path.join(metaDir, 'index.ts');
    if (fse.existsSync(metaIndexFile) && !force) {
      // do nothing
      return;
    }
    await this.helper.ensureDir(metaDir);
    // relativeNameCapitalize
    const relativeNameCapitalize = this.helper.stringToCapitalize(moduleName, '-');
    // onionScenesMeta
    const onionScenesMeta = getOnionScenesMeta(this.modulesMeta.modules);
    // content
    let content = '';
    // onions
    const scopeResources = {};
    for (const sceneName in onionScenesMeta) {
      const sceneMeta = onionScenesMeta[sceneName];
      // general
      content += await generateOnions(sceneName, sceneMeta, moduleName, modulePath);
      // scope resources
      if (sceneMeta.scopeResource) {
        const contentScopeResource = await generateScopeResources(sceneName, sceneMeta, moduleName, modulePath);
        if (contentScopeResource) {
          content += contentScopeResource;
          scopeResources[sceneName] = `IModule${toUpperCaseFirstChar(sceneName)}`;
        }
      }
      // bean generals
      if (sceneMeta.beanGeneral) {
        content += await generateBeanGenerals(sceneName, sceneMeta, moduleName, modulePath);
      }
      // metas
      if (sceneName === 'meta') {
        const onionMetasMeta = getOnionMetasMeta(this.modulesMeta.modules);
        for (const metaName in onionMetasMeta) {
          const metaMeta = onionMetasMeta[metaName];
          if (metaMeta.scopeResource) {
            const contentScopeResourceMeta = await generateScopeResourcesMeta(
              metaName,
              metaMeta,
              sceneName,
              sceneMeta,
              moduleName,
              modulePath,
            );
            if (contentScopeResourceMeta) {
              content += contentScopeResourceMeta;
              scopeResources[metaName] = `Meta${toUpperCaseFirstChar(metaName)}`;
            }
          }
        }
      }
      // metadata custom
      if (sceneMeta.metadataCustom) {
        content += await generateMetadataCustom(this, sceneName, sceneMeta, moduleName, modulePath);
      }
    }
    // config
    const contentConfig = await generateConfig(modulePath);
    content += contentConfig;
    // constant
    const contentConstants = await generateConstant(modulePath);
    content += contentConstants;
    // locale
    const contentLocales1 = await generateLocale1(modulePath);
    const contentLocales2 = await generateLocale2(contentLocales1);
    content += contentLocales2;
    // error
    const contentErrors = await generateError(modulePath);
    content += contentErrors;
    // monkey
    content += await generateMonkey(modulePath);
    // main
    content += await generateMain(modulePath);
    // scope
    const generateScopeOptions = {
      config: contentConfig,
      errors: contentErrors,
      locales: contentLocales2,
      constants: contentConstants,
    };
    content += await generateScope(moduleName, relativeNameCapitalize, scopeResources, generateScopeOptions);
    // patch
    content = this._generatePatch(content);
    // empty
    if (!content.trim()) {
      content = 'export {};';
    } else {
      content = `/* eslint-disable */\n${content}`;
    }
    // save
    await fse.writeFile(metaIndexFile, content);
    // await this.helper.formatFile({ fileName: metaIndexFile, logPrefix: 'format: ' });
    // locales
    await this._generateLocales(modulePath, contentLocales1);
    // generate this
    await this._generateThis(moduleName, relativeNameCapitalize, modulePath, generateScopeOptions);
    // index
    await this._generateIndex(modulePath);
    // package
    await this._generatePackage(modulePath);
  }

  _generatePatch(content: string) {
    if (!content) return content;
    content = this._generatePatch_resources(content, 'table-identity', ['TableIdentity'], true);
    content = this._generatePatch_resources(content, 'vona-module-a-openapi', ['TypeEntityOptionsFields', 'TypeControllerOptionsActions'], true);
    content = this._generatePatch_resources(content, 'vona-module-a-orm', [
      'TypeEntityMeta',
      'TypeModelsClassLikeGeneral',
      'TypeSymbolKeyFieldsMore',
      'IModelRelationHasOne',
      'IModelRelationBelongsTo',
      'IModelRelationHasMany',
      'IModelRelationBelongsToMany',
    ], true);
    content = this._generatePatch_resources(content, 'vona', ['PowerPartial'], true);
    return content;
  }

  _generatePatch_resources(content: string, packageName: string, resources: string[], type: boolean) {
    const items = resources.filter(item => {
      const regexp = new RegExp(`${item}[\\[\\]<,;?:\\s]`);
      return !!regexp.exec(content);
    });
    if (items.length === 0) return content;
    const importContent = `import ${type ? 'type ' : ''}{ ${items.join(',')} } from '${packageName}';`;
    return `${importContent}\n${content}`;
  }

  async _generateLocales(modulePath, contentLocales) {
    if (!contentLocales) return;
    const localesDest = path.join(modulePath, 'src/.metadata/locales.ts');
    // save
    await fse.writeFile(localesDest, contentLocales);
  }

  async _generateThis(moduleName: string, relativeNameCapitalize: string, modulePath: string, generateScopeOptions: GenerateScopeOptions) {
    const thisDest = path.join(modulePath, 'src/.metadata/this.ts');
    // this
    let content = `export const __ThisModule__ = '${moduleName}';
export { ScopeModule${relativeNameCapitalize} as ScopeModule } from './index.ts';
`;
    // locale
    if (generateScopeOptions.locales) {
      content = `import type { TypeLocaleBase } from 'vona';
import type { locales } from './locales.ts';

${content}`;
      content += `export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): \`${moduleName}::\${K}\` {
  return \`${moduleName}::\${key}\`;
}
`;
    }
    // save
    await fse.writeFile(thisDest, content);
  }

  async _generateIndex(modulePath: string) {
    let jsContent = '';
    const jsFile = path.join(modulePath, 'src/index.ts');
    if (fse.existsSync(jsFile)) {
      jsContent = (await fse.readFile(jsFile)).toString();
    }
    // jsTypes
    const jsTypes = "export * from './types/index.ts';";
    const jsTypesFile = path.join(modulePath, 'src/types/index.ts');
    if (fse.existsSync(jsTypesFile) && !jsContent.includes(jsTypes)) {
      jsContent = `${jsTypes}\n${jsContent}`;
    }
    // jsLib
    const jsLib = "export * from './lib/index.ts';";
    const jsLibFile = path.join(modulePath, 'src/lib/index.ts');
    if (fse.existsSync(jsLibFile) && !jsContent.includes(jsLib)) {
      jsContent = `${jsLib}\n${jsContent}`;
    }
    // jsMetadata
    const jsMetadata = "export * from './.metadata/index.ts';";
    const jsMetadataFile = path.join(modulePath, 'src/.metadata/index.ts');
    if (fse.existsSync(jsMetadataFile) && !jsContent.includes(jsMetadata)) {
      jsContent = `${jsMetadata}\n${jsContent}`;
    }
    // trim empty
    jsContent = jsContent.replace('export {};\n', '');
    // write
    await fse.writeFile(jsFile, jsContent);
    await this.helper.formatFile({ fileName: jsFile, logPrefix: 'format: ' });
  }

  async _generatePackage(modulePath: string) {
    let pkgFile: string;
    let pkg: any;
    let changed: boolean | undefined;
    async function _loadPkg() {
      if (!pkg) {
        pkgFile = path.join(modulePath, 'package.json');
        pkg = await loadJSONFile(pkgFile);
      }
      return pkg;
    }
    // cli
    const cli = path.join(modulePath, 'cli');
    if (fse.existsSync(cli)) {
      pkg = await _loadPkg();
      const index = pkg.files.indexOf('cli');
      if (index === -1) {
        changed = true;
        pkg.files.push('cli');
      }
    }
    // save
    if (changed) {
      await saveJSONFile(pkgFile!, pkg);
      await this.helper.formatFile({ fileName: pkgFile! });
    }
  }
}
