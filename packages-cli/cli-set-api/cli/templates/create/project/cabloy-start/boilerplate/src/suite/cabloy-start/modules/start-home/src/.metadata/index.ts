/* eslint-disable */
/** ssrSite: begin */
export * from '../bean/ssrSite.home.ts';
import type { ISsrSiteOptionsHome } from '../bean/ssrSite.home.ts';
import 'vona-module-a-ssr';
declare module 'vona-module-a-ssr' {
  
    export interface ISsrSiteRecord {
      'start-home:home': ISsrSiteOptionsHome;
    }

  
}
declare module 'vona-module-start-home' {
  
        export interface SsrSiteHome {
          /** @internal */
          get scope(): ScopeModuleStartHome;
        }

          export interface SsrSiteHome {
            get $beanFullName(): 'start-home.ssrSite.home';
            get $onionName(): 'start-home:home';
            get $onionOptions(): ISsrSiteOptionsHome;
          } 
}
/** ssrSite: end */
/** ssrMenu: begin */
export * from '../bean/ssrMenu.home.ts';
import type { ISsrMenuOptionsHome } from '../bean/ssrMenu.home.ts';
import 'vona-module-a-ssr';
declare module 'vona-module-a-ssr' {
  
    export interface ISsrMenuRecord {
      'start-home:home': ISsrMenuOptionsHome;
    }

  
}
declare module 'vona-module-start-home' {
  
        export interface SsrMenuHome {
          /** @internal */
          get scope(): ScopeModuleStartHome;
        }

          export interface SsrMenuHome {
            get $beanFullName(): 'start-home.ssrMenu.home';
            get $onionName(): 'start-home:home';
            get $onionOptions(): ISsrMenuOptionsHome;
          } 
}
/** ssrMenu: end */
/** ssrMenuGroup: begin */
export * from '../bean/ssrMenuGroup.management.ts';
import type { ISsrMenuGroupOptionsManagement } from '../bean/ssrMenuGroup.management.ts';
import 'vona-module-a-ssr';
declare module 'vona-module-a-ssr' {
  
    export interface ISsrMenuGroupRecord {
      'start-home:management': ISsrMenuGroupOptionsManagement;
    }

  
}
declare module 'vona-module-start-home' {
  
        export interface SsrMenuGroupManagement {
          /** @internal */
          get scope(): ScopeModuleStartHome;
        }

          export interface SsrMenuGroupManagement {
            get $beanFullName(): 'start-home.ssrMenuGroup.management';
            get $onionName(): 'start-home:management';
            get $onionOptions(): ISsrMenuGroupOptionsManagement;
          } 
}
/** ssrMenuGroup: end */
/** locale: begin */
import { locales } from './locales.ts';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, type TypeModuleLocales, type TypeLocaleBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleStartHome extends BeanScopeBase {}

export interface ScopeModuleStartHome {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'start-home': ScopeModuleStartHome;
  }

  export interface IBeanScopeContainer {
    startHome: ScopeModuleStartHome;
  }
  
  

  export interface IBeanScopeLocale {
    'start-home': (typeof locales)[TypeLocaleBase];
  }

  
}
/** scope: end */
