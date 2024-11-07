/** beans: begin */
export * from '../bean/bean.file.js';
export * from '../bean/version.manager.js';
import { BeanFile } from '../bean/bean.file.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    file: BeanFile;
  }

  export interface IBeanRecordGeneral {
    'a-file.version.manager': VersionManager;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/file.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/file.js';
export * from '../entity/fileView.js';
/** entities: end */
/** models: begin */
export * from '../model/file.js';
export * from '../model/fileView.js';
import { ModelFile } from '../model/file.js';
import { ModelFileView } from '../model/fileView.js';
export interface IModuleModel {
  file: ModelFile;
  fileView: ModelFileView;
}
/** models: end */
/** services: begin */
export * from '../service/file.js';
import { ServiceFile } from '../service/file.js';
export interface IModuleService {
  file: ServiceFile;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-file.service.file': ServiceFile;
  }
}
/** services: end */
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
export class ScopeModuleAFile extends BeanScopeBase {}

export interface ScopeModuleAFile
  extends TypeModuleResource<any, any, (typeof locales)[TypeLocaleBase], any, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-file': ScopeModuleAFile;
  }

  export interface BeanScopeContainer {
    file: ScopeModuleAFile;
  }

  export interface IBeanScopeLocale {
    'a-file': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
