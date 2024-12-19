/** beans: begin */
export * from '../bean/io.message.hotloadFile.js';
export * from '../bean/version.manager.js';
import { IoMessageHotloadFile } from '../bean/io.message.hotloadFile.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-cms.io.message.hotloadFile': IoMessageHotloadFile;
    'a-cms.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-cms' {
  export interface IoMessageHotloadFile {
    /** @internal */
    get scope(): ScopeModuleACms;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/article.js';
export * from '../entity/content.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-cms:article': IDecoratorEntityOptions;
    'a-cms:content': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-cms' {}
/** entity: end */
/** entity: begin */
import { EntityArticle } from '../entity/article.js';
import { EntityContent } from '../entity/content.js';
export interface IModuleEntity {
  article: EntityArticle;
  content: EntityContent;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-cms' {
  export interface EntityArticle {
    column: <K extends keyof Omit<EntityArticle, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityArticle, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityContent {
    column: <K extends keyof Omit<EntityContent, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityContent, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/article.js';
export * from '../model/content.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-cms:article': IDecoratorModelOptions;
    'a-cms:content': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-cms' {
  export interface ModelArticle {
    /** @internal */
    get scope(): ScopeModuleACms;
  }

  export interface ModelContent {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** model: end */
/** model: begin */
import { ModelArticle } from '../model/article.js';
import { ModelContent } from '../model/content.js';
export interface IModuleModel {
  article: ModelArticle;
  content: ModelContent;
}
/** model: end */
/** atom: begin */
export * from '../atom/article.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-cms:article': never;
  }
}
declare module 'vona-module-a-cms' {
  export interface AtomArticle {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** atom: end */
/** bean: begin */
export * from '../bean/bean.atomCmsBase_.js';
export * from '../bean/bean.cms.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-cms' {
  export interface BeanCms {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** bean: end */
/** bean: begin */
import { BeanCms } from '../bean/bean.cms.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    cms: BeanCms;
  }
}
/** bean: end */
/** meta: begin */
export * from '../bean/meta.status.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-cms:status': never;
  }
}
declare module 'vona-module-a-cms' {
  export interface MetaStatus {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** meta: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
/** queue: begin */
export * from '../bean/queue.render.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  export interface IQueueRecord {
    'a-cms:render': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-a-cms' {
  export interface QueueRender {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** queue: end */
/** queue: begin */
import { QueueRender } from '../bean/queue.render.js';
export interface IModuleQueue {
  render: QueueRender;
}
/** queue: end */
/** startup: begin */
export * from '../bean/startup.registerAllWatchers.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'a-cms:registerAllWatchers': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-cms' {
  export interface StartupRegisterAllWatchers {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** startup: end */
/** service: begin */
export * from '../service/build.js';
export * from '../service/render.js';
export * from '../service/site.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-cms:build': never;
    'a-cms:render': never;
    'a-cms:site': never;
  }
}
declare module 'vona-module-a-cms' {
  export interface ServiceBuild {
    /** @internal */
    get scope(): ScopeModuleACms;
  }

  export interface ServiceRender {
    /** @internal */
    get scope(): ScopeModuleACms;
  }

  export interface ServiceSite {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** service: end */
/** service: begin */
import { ServiceBuild } from '../service/build.js';
import { ServiceRender } from '../service/render.js';
import { ServiceSite } from '../service/site.js';
export interface IModuleService {
  build: ServiceBuild;
  render: ServiceRender;
  site: ServiceSite;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-cms.service.build': ServiceBuild;
    'a-cms.service.render': ServiceRender;
    'a-cms.service.site': ServiceSite;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/article.js';
export * from '../controller/comment.js';
export * from '../controller/render.js';
export * from '../controller/rss.js';
export * from '../controller/site.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-cms:article': IDecoratorControllerOptions;
    'a-cms:comment': IDecoratorControllerOptions;
    'a-cms:render': IDecoratorControllerOptions;
    'a-cms:rss': IDecoratorControllerOptions;
    'a-cms:site': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-cms' {
  export interface ControllerArticle {
    /** @internal */
    get scope(): ScopeModuleACms;
  }

  export interface ControllerComment {
    /** @internal */
    get scope(): ScopeModuleACms;
  }

  export interface ControllerRender {
    /** @internal */
    get scope(): ScopeModuleACms;
  }

  export interface ControllerRss {
    /** @internal */
    get scope(): ScopeModuleACms;
  }

  export interface ControllerSite {
    /** @internal */
    get scope(): ScopeModuleACms;
  }
}
/** controller: end */
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
import {
  BeanScopeBase,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleACms extends BeanScopeBase {}

export interface ScopeModuleACms {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  entity: IModuleEntity;
  model: IModuleModel;
  status: MetaStatus;
  queue: IModuleQueue;
  service: IModuleService;
}

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
