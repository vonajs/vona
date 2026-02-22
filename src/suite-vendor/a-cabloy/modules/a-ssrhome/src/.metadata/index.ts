/* eslint-disable */
/** ssrSite: begin */
export * from '../bean/ssrSite.home.ts';
import type { ISsrSiteOptionsHome } from '../bean/ssrSite.home.ts';
import 'vona-module-a-ssr';
declare module 'vona-module-a-ssr' {
  
    export interface ISsrSiteRecord {
      'a-ssrhome:home': ISsrSiteOptionsHome;
    }

  
}
declare module 'vona-module-a-ssrhome' {
  
        export interface SsrSiteHome {
          /** @internal */
          get scope(): ScopeModuleASsrhome;
        }

          export interface SsrSiteHome {
            get $beanFullName(): 'a-ssrhome.ssrSite.home';
            get $onionName(): 'a-ssrhome:home';
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
      'a-ssrhome:home': ISsrMenuOptionsHome;
    }

  
}
declare module 'vona-module-a-ssrhome' {
  
        export interface SsrMenuHome {
          /** @internal */
          get scope(): ScopeModuleASsrhome;
        }

          export interface SsrMenuHome {
            get $beanFullName(): 'a-ssrhome.ssrMenu.home';
            get $onionName(): 'a-ssrhome:home';
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
      'a-ssrhome:management': ISsrMenuGroupOptionsManagement;
    }

  
}
declare module 'vona-module-a-ssrhome' {
  
        export interface SsrMenuGroupManagement {
          /** @internal */
          get scope(): ScopeModuleASsrhome;
        }

          export interface SsrMenuGroupManagement {
            get $beanFullName(): 'a-ssrhome.ssrMenuGroup.management';
            get $onionName(): 'a-ssrhome:management';
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
export class ScopeModuleASsrhome extends BeanScopeBase {}

export interface ScopeModuleASsrhome {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-ssrhome': ScopeModuleASsrhome;
  }

  export interface IBeanScopeContainer {
    ssrhome: ScopeModuleASsrhome;
  }
  
  

  export interface IBeanScopeLocale {
    'a-ssrhome': (typeof locales)[TypeLocaleBase];
  }

  
}
/** scope: end */
