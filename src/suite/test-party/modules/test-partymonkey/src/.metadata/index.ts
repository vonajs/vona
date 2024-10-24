/** controllers: begin */
export * from '../controller/monkeyer.js';
/** controllers: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleTestPartymonkey extends BeanScopeBase {}

export interface ScopeModuleTestPartymonkey extends TypeModuleResource<any, any, any, any, any, any> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'test-partymonkey': ScopeModuleTestPartymonkey;
  }
}
/** scope: end */
