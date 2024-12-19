/** controller: begin */
export * from '../controller/monkeyer.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'test-partymonkey:monkeyer': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-test-partymonkey' {
  export interface ControllerMonkeyer {
    /** @internal */
    get scope(): ScopeModuleTestPartymonkey;
  }
}
/** controller: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleTestPartymonkey extends BeanScopeBase {}

export interface ScopeModuleTestPartymonkey {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'test-partymonkey': ScopeModuleTestPartymonkey;
  }

  export interface IBeanScopeContainer {
    testPartymonkey: ScopeModuleTestPartymonkey;
  }
}

/** scope: end */
