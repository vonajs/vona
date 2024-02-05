import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleACaptchasimple extends BeanScopeBase {}

export interface ScopeModuleACaptchasimple
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales,
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'a-captchasimple': ScopeModuleACaptchasimple;
  }

  export interface IBeanScopeConfig {
    'a-captchasimple': ReturnType<typeof config>;
  }
}
