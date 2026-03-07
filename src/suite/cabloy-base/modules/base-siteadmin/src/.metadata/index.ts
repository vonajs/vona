/* eslint-disable */
/** ssrSite: begin */
export * from '../bean/ssrSite.admin.ts';
import type { ISsrSiteOptionsAdmin } from '../bean/ssrSite.admin.ts';
import 'vona-module-a-ssr';
declare module 'vona-module-a-ssr' {
  
    export interface ISsrSiteRecord {
      'base-siteadmin:admin': ISsrSiteOptionsAdmin;
    }

  
}
declare module 'vona-module-base-siteadmin' {
  
        export interface SsrSiteAdmin {
          /** @internal */
          get scope(): ScopeModuleBaseSiteadmin;
        }

          export interface SsrSiteAdmin {
            get $beanFullName(): 'base-siteadmin.ssrSite.admin';
            get $onionName(): 'base-siteadmin:admin';
            get $onionOptions(): ISsrSiteOptionsAdmin;
          } 
}
/** ssrSite: end */
/** ssrMenu: begin */
export * from '../bean/ssrMenu.home.ts';
import type { ISsrMenuOptionsHome } from '../bean/ssrMenu.home.ts';
import 'vona-module-a-ssr';
declare module 'vona-module-a-ssr' {
  
    export interface ISsrMenuRecord {
      'base-siteadmin:home': ISsrMenuOptionsHome;
    }

  
}
declare module 'vona-module-base-siteadmin' {
  
        export interface SsrMenuHome {
          /** @internal */
          get scope(): ScopeModuleBaseSiteadmin;
        }

          export interface SsrMenuHome {
            get $beanFullName(): 'base-siteadmin.ssrMenu.home';
            get $onionName(): 'base-siteadmin:home';
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
      'base-siteadmin:management': ISsrMenuGroupOptionsManagement;
    }

  
}
declare module 'vona-module-base-siteadmin' {
  
        export interface SsrMenuGroupManagement {
          /** @internal */
          get scope(): ScopeModuleBaseSiteadmin;
        }

          export interface SsrMenuGroupManagement {
            get $beanFullName(): 'base-siteadmin.ssrMenuGroup.management';
            get $onionName(): 'base-siteadmin:management';
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
export class ScopeModuleBaseSiteadmin extends BeanScopeBase {}

export interface ScopeModuleBaseSiteadmin {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'base-siteadmin': ScopeModuleBaseSiteadmin;
  }

  export interface IBeanScopeContainer {
    baseSiteadmin: ScopeModuleBaseSiteadmin;
  }
  
  

  export interface IBeanScopeLocale {
    'base-siteadmin': (typeof locales)[TypeLocaleBase];
  }

  
}
/** scope: end */
