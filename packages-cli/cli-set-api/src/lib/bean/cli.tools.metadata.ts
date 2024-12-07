import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import path from 'path';
import { generateBeans } from './toolsMetadata/generateBeans.js';
import { generateOnions } from './toolsMetadata/generateOnions.js';
import { generateAtoms } from './toolsMetadata/generateAtoms.js';
import { generateDtos } from './toolsMetadata/generateDtos.js';
import { generateMetaStatus } from './toolsMetadata/generateMetaStatus.js';
import { generateSummerCaches } from './toolsMetadata/generateSummerCaches.js';
import { generateEntities } from './toolsMetadata/generateEntities.js';
import { generateModels } from './toolsMetadata/generateModels.js';
import { generateServices } from './toolsMetadata/generateServices.js';
import { generateConfig, generateConstant, generateError, generateLocale } from './toolsMetadata/generateConfig.js';
import { generateScope } from './toolsMetadata/generateScope.js';
import { generateMonkey, generateMain } from './toolsMetadata/generateMonkey.js';

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
    // content
    let content = '';
    // beans
    content += await generateBeans(moduleName, modulePath);
    // middlewares
    content += await generateOnions('middleware', moduleName, modulePath);
    // guards
    content += await generateOnions('guard', moduleName, modulePath);
    // interceptors
    content += await generateOnions('interceptor', moduleName, modulePath);
    // pipes
    content += await generateOnions('pipe', moduleName, modulePath);
    // filters
    content += await generateOnions('filter', moduleName, modulePath);
    // socket connections
    content += await generateOnions('socketConnection', moduleName, modulePath);
    // socket packets
    content += await generateOnions('socketPacket', moduleName, modulePath);
    // aops
    content += await generateOnions('aop', moduleName, modulePath);
    // entities
    content += await generateOnions('entity', moduleName, modulePath);
    // models
    content += await generateOnions('model', moduleName, modulePath);
    // controllers
    content += await generateOnions('controller', moduleName, modulePath);
    // meta
    content += await generateOnions('meta', moduleName, modulePath);
    // summerCaches
    content += await generateOnions('summerCache', moduleName, modulePath);
    // startups
    content += await generateOnions('startup', moduleName, modulePath);
    // atoms
    content += await generateAtoms(moduleName, modulePath);
    // dtos
    content += await generateDtos(moduleName, modulePath);
    // meta status
    const contentMetaStatus = await generateMetaStatus(moduleName, modulePath);
    content += contentMetaStatus;
    // summerCaches
    const contentSummerCaches = await generateSummerCaches(moduleName, modulePath);
    content += contentSummerCaches;
    // entities
    const contentEntities = await generateEntities(moduleName, modulePath);
    content += contentEntities;
    // models
    const contentModels = await generateModels(moduleName, modulePath);
    content += contentModels;
    // services
    const contentServices = await generateServices(moduleName, modulePath);
    content += contentServices;
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
    content += await generateScope(moduleName, relativeNameCapitalize, {
      config: contentConfig,
      errors: contentErrors,
      locales: contentLocales,
      constants: contentConstants,
      status: contentMetaStatus,
      services: contentServices,
      models: contentModels,
      entities: contentEntities,
      summerCaches: contentSummerCaches,
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
