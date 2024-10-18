import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleASocketio extends BeanScopeBase {}

export interface ScopeModuleASocketio
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales[TypeLocaleBase],
    typeof constants
  > {}

declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-socketio': ScopeModuleASocketio;
  }

  export interface IBeanScopeConfig {
    'a-socketio': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-socketio': typeof locales[TypeLocaleBase];
  }
}
