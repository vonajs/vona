/** beans: begin */
export * from '../bean/bean.atomCmsBase.js';
export * from '../bean/bean.cms.js';
export * from '../bean/io.message.hotloadFile.js';
export * from '../bean/queue.render.js';
export * from '../bean/startup.registerAllWatchers.js';
export * from '../bean/version.manager.js';
import { BeanAtomCmsBase } from '../bean/bean.atomCmsBase.js';
import { BeanCms } from '../bean/bean.cms.js';
import { IoMessageHotloadFile } from '../bean/io.message.hotloadFile.js';
import { QueueRender } from '../bean/queue.render.js';
import { StartupRegisterAllWatchers } from '../bean/startup.registerAllWatchers.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    atomCmsBase: BeanAtomCmsBase;
    cms: BeanCms;
  }

  export interface IBeanRecordGeneral {
    'a-cms.io.message.hotloadFile': IoMessageHotloadFile;
    'a-cms.queue.render': QueueRender;
    'a-cms.startup.registerAllWatchers': StartupRegisterAllWatchers;
    'a-cms.version.manager': VersionManager;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/article.js';
export * from '../entity/content.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-cms:article': IDecoratorEntityOptions;
    'a-cms:content': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/article.js';
export * from '../model/content.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-cms:article': IDecoratorModelOptions;
    'a-cms:content': IDecoratorModelOptions;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/article.js';
export * from '../controller/comment.js';
export * from '../controller/render.js';
export * from '../controller/rss.js';
export * from '../controller/site.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-cms:article': IDecoratorControllerOptions;
    'a-cms:comment': IDecoratorControllerOptions;
    'a-cms:render': IDecoratorControllerOptions;
    'a-cms:rss': IDecoratorControllerOptions;
    'a-cms:site': IDecoratorControllerOptions;
  }
}
/** controller: end */
/** meta: begin */
export * from '../bean/meta.status.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-cms:status': never;
  }
}
/** meta: end */
/** atoms: begin */
export * from '../atom/article.js';
/** atoms: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
/** entities: begin */
import { EntityArticle } from '../entity/article.js';
import { EntityContent } from '../entity/content.js';
export interface IModuleEntity {
  article: EntityArticle;
  content: EntityContent;
}
/** entities: end */
/** models: begin */
import { ModelArticle } from '../model/article.js';
import { ModelContent } from '../model/content.js';
export interface IModuleModel {
  article: ModelArticle;
  content: ModelContent;
}
/** models: end */
/** services: begin */
export * from '../service/build.js';
export * from '../service/render.js';
export * from '../service/site.js';
import { ServiceBuild } from '../service/build.js';
import { ServiceRender } from '../service/render.js';
import { ServiceSite } from '../service/site.js';
export interface IModuleService {
  build: ServiceBuild;
  render: ServiceRender;
  site: ServiceSite;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-cms.service.build': ServiceBuild;
    'a-cms.service.render': ServiceRender;
    'a-cms.service.site': ServiceSite;
  }
}
/** services: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleACms extends BeanScopeBase {}

export interface ScopeModuleACms
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    never,
    MetaStatus,
    IModuleService,
    IModuleModel,
    IModuleEntity,
    never
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cms': ScopeModuleACms;
  }

  export interface IBeanScopeContainer {
    cms: ScopeModuleACms;
  }

  export interface IBeanScopeConfig {
    'a-cms': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-cms': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-cms:${K}` {
  return `a-cms:${key}`;
}
/** scope: end */
