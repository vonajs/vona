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
/** beans: end */
/** entity: begin */
export * from '../entity/mail.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-mail:mail': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/mail.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-mail:mail': IDecoratorModelOptions;
  }
}
/** model: end */
/** controller: begin */
export * from '../controller/scene.js';

import { IDecoratorControllerOptions } from 'vona';
declare module 'vona' {
  export interface IControllerRecord {
    'a-mail:scene': IDecoratorControllerOptions;
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
/** meta: end */
/** startup: begin */
export * from '../bean/startup.cacheMailScenes.js';

import { IDecoratorStartupOptions } from 'vona';
declare module 'vona' {
  export interface IStartupRecord {
    'a-mail:cacheMailScenes': IDecoratorStartupOptions;
  }
}
/** startup: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
/** entities: begin */
import { EntityMail } from '../entity/mail.js';
export interface IModuleEntity {
  mail: EntityMail;
}
/** entities: end */
/** models: begin */
import { ModelMail } from '../model/mail.js';
export interface IModuleModel {
  mail: ModelMail;
}
/** models: end */
/** services: begin */
export * from '../service/scene.js';
import { ServiceScene } from '../service/scene.js';
export interface IModuleService {
  scene: ServiceScene;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-mail.service.scene': ServiceScene;
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
/** scope: begin */
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAMail extends BeanScopeBase {}

export interface ScopeModuleAMail
  extends TypeModuleResource<
    typeof config,
    never,
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
