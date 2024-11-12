/** pipes: begin */
export * from '../bean/pipe.parseInt.js';
import { IPipeOptionsParseInt } from '../bean/pipe.parseInt.js';
import 'vona';
declare module 'vona' {
  export interface IPipeRecordLocal {
    'a-pipe:parseInt': IPipeOptionsParseInt;
  }
}
/** pipes: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleAPipe extends BeanScopeBase {}

export interface ScopeModuleAPipe extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-pipe': ScopeModuleAPipe;
  }

  export interface IBeanScopeContainer {
    pipe: ScopeModuleAPipe;
  }
}
/** scope: end */
