import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import { getOnionMetasMeta, getOnionScenesMeta } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import { generateBeanGenerals } from './toolsMetadata/generateBeanGenerals.ts';
import { generateConfig, generateConstant, generateError, generateLocale } from './toolsMetadata/generateConfig.ts';
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
    const contentLocales = await generateLocale(modulePath);
    content += contentLocales;
    // error
    const contentErrors = await generateError(modulePath);
    content += contentErrors;
    // monkey
    content += await generateMonkey(modulePath);
    // main
    content += await generateMain(modulePath);
    // scope
    content += await generateScope(moduleName, relativeNameCapitalize, scopeResources, {
      config: contentConfig,
      errors: contentErrors,
      locales: contentLocales,
      constants: contentConstants,
    });
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
    // generate this
    await this._generateThis(moduleName, relativeNameCapitalize, modulePath);
    // index
    await this._generateIndex(modulePath);
  }

  _generatePatch(content: string) {
    if (!content) return content;
    if (content.includes('TypeEntityOptionsFields')) {
      content = `import type { TypeEntityOptionsFields } from 'vona-module-a-openapi';\n${content}`;
    }
    if (content.includes('TypeControllerOptionsActions')) {
      content = `import type { TypeControllerOptionsActions } from 'vona-module-a-openapi';\n${content}`;
    }
    if (content.includes('TypeEntityMeta')) {
      content = `import type { TypeEntityMeta } from 'vona-module-a-database';\n${content}`;
    }
    if (content.includes('TypeSymbolKeyFieldsMore')) {
      content = `import type { TypeSymbolKeyFieldsMore } from 'vona-module-a-database';\n${content}`;
    }
    return content;
  }

  async _generateThis(moduleName: string, relativeNameCapitalize: string, modulePath: string) {
    const thisDest = path.join(modulePath, 'src/.metadata/this.ts');
    if (fse.existsSync(thisDest)) return;
    const content = `export const __ThisModule__ = '${moduleName}';
export { ScopeModule${relativeNameCapitalize} as ScopeModule } from './index.ts';
`;
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
}
