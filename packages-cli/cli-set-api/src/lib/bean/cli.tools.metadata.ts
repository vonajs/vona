import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import path from 'path';
import { generateBeans } from './toolsMetadata/generateBeans.js';
import { generateOnions } from './toolsMetadata/generateOnions.js';
import { generateDtos } from './toolsMetadata/generateDtos.js';
import { generateMetaStatus, generateMetaRedlock } from './toolsMetadata/generateMetaStatus.js';
import { generateScopeResources } from './toolsMetadata/generateScopeResources.js';
import { generateEntities } from './toolsMetadata/generateEntities.js';
import { generateModels } from './toolsMetadata/generateModels.js';
import { generateServices } from './toolsMetadata/generateServices.js';
import { generateConfig, generateConstant, generateError, generateLocale } from './toolsMetadata/generateConfig.js';
import { generateScope } from './toolsMetadata/generateScope.js';
import { generateMonkey, generateMain } from './toolsMetadata/generateMonkey.js';
import { getOnionScenesMeta } from 'vona-shared';

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
    const onionScenesMeta = getOnionScenesMeta(this.helper.cli.modulesMeta.modules);
    // content
    let content = '';
    // beans
    content += await generateBeans(onionScenesMeta, moduleName, modulePath);
    // middlewares
    content += await generateOnions('middleware', onionScenesMeta, moduleName, modulePath);
    // guards
    content += await generateOnions('guard', onionScenesMeta, moduleName, modulePath);
    // interceptors
    content += await generateOnions('interceptor', onionScenesMeta, moduleName, modulePath);
    // pipes
    content += await generateOnions('pipe', onionScenesMeta, moduleName, modulePath);
    // filters
    content += await generateOnions('filter', onionScenesMeta, moduleName, modulePath);
    // socket connections
    content += await generateOnions('socketConnection', onionScenesMeta, moduleName, modulePath);
    // socket packets
    content += await generateOnions('socketPacket', onionScenesMeta, moduleName, modulePath);
    // aops
    content += await generateOnions('aop', onionScenesMeta, moduleName, modulePath);
    // entities
    content += await generateOnions('entity', onionScenesMeta, moduleName, modulePath);
    // models
    content += await generateOnions('model', onionScenesMeta, moduleName, modulePath);
    // controllers
    content += await generateOnions('controller', onionScenesMeta, moduleName, modulePath);
    // meta
    content += await generateOnions('meta', onionScenesMeta, moduleName, modulePath);
    // summerCaches
    content += await generateOnions('summerCache', onionScenesMeta, moduleName, modulePath);
    // startups
    content += await generateOnions('startup', onionScenesMeta, moduleName, modulePath);
    // queues
    content += await generateOnions('queue', onionScenesMeta, moduleName, modulePath);
    // schedules
    content += await generateOnions('schedule', onionScenesMeta, moduleName, modulePath);
    // atoms
    content += await generateOnions('atom', onionScenesMeta, moduleName, modulePath);
    // atoms
    //content += await generateAtoms(moduleName, modulePath);
    // dtos
    content += await generateDtos(moduleName, modulePath);
    // meta status
    const contentMetaStatus = await generateMetaStatus(moduleName, modulePath);
    content += contentMetaStatus;
    // meta redlock
    const contentMetaRedlock = await generateMetaRedlock(moduleName, modulePath);
    content += contentMetaRedlock;
    // summerCaches
    const contentSummerCaches = await generateScopeResources('summerCache', moduleName, modulePath);
    content += contentSummerCaches;
    // queues
    const contentQueues = await generateScopeResources('queue', moduleName, modulePath);
    content += contentQueues;
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
      redlock: contentMetaRedlock,
      services: contentServices,
      models: contentModels,
      entities: contentEntities,
      summerCaches: contentSummerCaches,
      queues: contentQueues,
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
