/** beans: begin */
export * from '../bean/bean.cms.js';
export * from '../bean/io.message.hotloadFile.js';
export * from '../bean/queue.render.js';
export * from '../bean/startup.registerAllWatchers.js';
export * from '../bean/version.manager.js';
export * from '../bean/virtual.atomCmsBase.js';
import { BeanCms } from '../bean/bean.cms.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    cms: BeanCms;
  }
}
/** beans: end */
/** atoms: begin */
export * from '../atom/article.js';
/** atoms: end */
/** controllers: begin */
export * from '../controller/article.js';
export * from '../controller/comment.js';
export * from '../controller/render.js';
export * from '../controller/rss.js';
export * from '../controller/site.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/article.js';
export * from '../entity/content.js';
/** entities: end */
/** models: begin */
export * from '../model/article.js';
export * from '../model/content.js';
import { ModelArticle } from '../model/article.js';
import { ModelContent } from '../model/content.js';
export interface IModuleModel {
  article: ModelArticle;
  content: ModelContent;
}
/** models: end */
/** services: begin */
export * from '../service/render.js';
export * from '../service/site.js';
import { ServiceRender } from '../service/render.js';
import { ServiceSite } from '../service/site.js';
export interface IModuleService {
  render: ServiceRender;
  site: ServiceSite;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
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
    any,
    IModuleService,
    IModuleModel
  > {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-cms': ScopeModuleACms;
  }

  export interface IBeanScopeConfig {
    'a-cms': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-cms': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
