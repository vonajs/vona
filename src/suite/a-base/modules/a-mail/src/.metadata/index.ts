/** beans: begin */
export * from '../bean/bean.mail.js';
export * from '../bean/bean.mailSceneCache.js';
export * from '../bean/broadcast.mailSceneChanged.js';
export * from '../bean/io.channel.mail.js';
export * from '../bean/io.message.mail.js';
export * from '../bean/version.manager.js';
import { BeanMail } from '../bean/bean.mail.js';
import { BeanMailSceneCache } from '../bean/bean.mailSceneCache.js';
import { BroadcastMailSceneChanged } from '../bean/broadcast.mailSceneChanged.js';
import { IoChannelMail } from '../bean/io.channel.mail.js';
import { IoMessageMail } from '../bean/io.message.mail.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    mail: BeanMail;
    mailSceneCache: BeanMailSceneCache;
  }

  export interface IBeanRecordGeneral {
    'a-mail.broadcast.mailSceneChanged': BroadcastMailSceneChanged;
    'a-mail.io.channel.mail': IoChannelMail;
    'a-mail.io.message.mail': IoMessageMail;
    'a-mail.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-mail' {
  export interface BeanMail {
    get scope(): ScopeModuleAMail;
  }

  export interface BeanMailSceneCache {
    get scope(): ScopeModuleAMail;
  }

  export interface BroadcastMailSceneChanged {
    get scope(): ScopeModuleAMail;
  }

  export interface IoChannelMail {
    get scope(): ScopeModuleAMail;
  }

  export interface IoMessageMail {
    get scope(): ScopeModuleAMail;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAMail;
  }
}
/** beans: end */
/** controller: begin */
export * from '../controller/scene.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-mail:scene': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-mail' {
  export interface ControllerScene {
    get scope(): ScopeModuleAMail;
  }
}
/** controller: end */
/** meta: begin */
export * from '../bean/meta.status.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-mail:status': never;
  }
}
declare module 'vona-module-a-mail' {
  export interface MetaStatus {
    get scope(): ScopeModuleAMail;
  }
}
/** meta: end */
/** startup: begin */
export * from '../bean/startup.cacheMailScenes.js';

import { IDecoratorStartupOptions } from 'vona';
declare module 'vona' {
  export interface IStartupRecord {
    'a-mail:cacheMailScenes': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-mail' {
  export interface StartupCacheMailScenes {
    get scope(): ScopeModuleAMail;
  }
}
/** startup: end */
/** entity: begin */
export * from '../entity/mail.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona' {
  export interface IEntityRecord {
    'a-mail:mail': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-mail' {}
/** entity: end */
/** entity: begin */
import { EntityMail } from '../entity/mail.js';
export interface IModuleEntity {
  mail: EntityMail;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-mail' {
  export interface EntityMail {
    column: <K extends keyof Omit<EntityMail, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityMail, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/mail.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona' {
  export interface IModelRecord {
    'a-mail:mail': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-mail' {
  export interface ModelMail {
    get scope(): ScopeModuleAMail;
  }
}
/** model: end */
/** model: begin */
import { ModelMail } from '../model/mail.js';
export interface IModuleModel {
  mail: ModelMail;
}
/** model: end */
/** service: begin */
export * from '../service/scene.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-mail:scene': never;
  }
}
declare module 'vona-module-a-mail' {
  export interface ServiceScene {
    get scope(): ScopeModuleAMail;
  }
}
/** service: end */
/** service: begin */
import { ServiceScene } from '../service/scene.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-mail.service.scene': ServiceScene;
  }
}
/** service: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
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
/** scope: begin */
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleLocales,
  TypeLocaleBase,
} from 'vona';

@Scope()
export class ScopeModuleAMail extends BeanScopeBase {}

export interface ScopeModuleAMail {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  status: MetaStatus;
  entity: IModuleEntity;
  model: IModuleModel;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-mail': ScopeModuleAMail;
  }

  export interface IBeanScopeContainer {
    mail: ScopeModuleAMail;
  }

  export interface IBeanScopeConfig {
    'a-mail': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-mail': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-mail:${K}` {
  return `a-mail:${key}`;
}
/** scope: end */
