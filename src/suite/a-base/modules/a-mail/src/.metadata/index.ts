/** beans: begin */
export * from '../bean/bean.mail.js';
export * from '../bean/bean.mailSceneCache.js';
export * from '../bean/broadcast.mailSceneChanged.js';
export * from '../bean/io.channel.mail.js';
export * from '../bean/io.message.mail.js';
export * from '../bean/startup.cacheMailScenes.js';
export * from '../bean/version.manager.js';
import { BeanMail } from '../bean/bean.mail.js';
import { BeanMailSceneCache } from '../bean/bean.mailSceneCache.js';
import { BroadcastMailSceneChanged } from '../bean/broadcast.mailSceneChanged.js';
import { IoChannelMail } from '../bean/io.channel.mail.js';
import { IoMessageMail } from '../bean/io.message.mail.js';
import { StartupCacheMailScenes } from '../bean/startup.cacheMailScenes.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    mail: BeanMail;
    mailSceneCache: BeanMailSceneCache;
    'a-mail.broadcast.mailSceneChanged': BroadcastMailSceneChanged;
    'a-mail.io.channel.mail': IoChannelMail;
    'a-mail.io.message.mail': IoMessageMail;
    'a-mail.startup.cacheMailScenes': StartupCacheMailScenes;
    'a-mail.version.manager': VersionManager;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/scene.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/mail.js';
/** entities: end */
/** models: begin */
export * from '../model/mail.js';
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
  export interface IBeanRecord {
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
  extends TypeModuleResource<typeof config, any, (typeof locales)[TypeLocaleBase], any, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-mail': ScopeModuleAMail;
  }

  export interface IBeanScopeConfig {
    'a-mail': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-mail': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
