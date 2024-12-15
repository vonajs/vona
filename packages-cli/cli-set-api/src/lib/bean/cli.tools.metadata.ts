import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import path from 'path';
import { generateBeans } from './toolsMetadata/generateBeans.js';
import { generateOnions } from './toolsMetadata/generateOnions.js';
import { generateBeanLocals } from './toolsMetadata/generateBeanLocals.js';
import { generateScopeResources } from './toolsMetadata/generateScopeResources.js';
import { generateScopeResourcesMeta } from './toolsMetadata/generateScopeResourcesMeta.js';
import { generateConfig, generateConstant, generateError, generateLocale } from './toolsMetadata/generateConfig.js';
import { generateScope } from './toolsMetadata/generateScope.js';
import { generateMonkey, generateMain } from './toolsMetadata/generateMonkey.js';
import { getOnionMetasMeta, getOnionScenesMeta } from 'vona-shared';
import { generateMetadataCustom } from './toolsMetadata/generateMetadataCustom.js';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';

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
    // beans
    content += await generateBeans(onionScenesMeta, moduleName, modulePath);
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
      // bean locals
      if (sceneMeta.beanLocal) {
        content += await generateBeanLocals(sceneName, sceneMeta, moduleName, modulePath);
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
    // empty
    if (!content.trim()) {
      content = 'export {};';
    }
    // save
    await fse.writeFile(metaIndexFile, content);
    await this.helper.formatFile({ fileName: metaIndexFile, logPrefix: 'format: ' });
    // generate this
    await this._generateThis(moduleName, relativeNameCapitalize, modulePath);
    // index
    await this._generateIndex(modulePath);
  }

  async _generateThis(moduleName: string, relativeNameCapitalize: string, modulePath: string) {
    const thisDest = path.join(modulePath, 'src/.metadata/this.ts');
    if (fse.existsSync(thisDest)) return;
    const content = `export const __ThisModule__ = '${moduleName}';
export { ScopeModule${relativeNameCapitalize} as ScopeModule } from './index.js';
`;
    // save
    await fse.writeFile(thisDest, content);
  }

  async _generateIndex(modulePath: string) {
    const jsExport = "export * from './.metadata/index.js';";
    const jsFile = path.join(modulePath, 'src/index.ts');
    let jsContent;
    if (fse.existsSync(jsFile)) {
      jsContent = (await fse.readFile(jsFile)).toString();
      if (jsContent.indexOf(jsExport) > -1) return;
      jsContent = jsExport + '\n' + jsContent;
      jsContent = jsContent.replace('export {};\n', '');
    } else {
      jsContent = jsExport + '\n';
    }
    await fse.writeFile(jsFile, jsContent);
  }
}
