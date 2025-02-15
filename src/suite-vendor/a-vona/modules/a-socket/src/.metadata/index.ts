/** scope: begin */
import type { BeanScopeUtil } from 'vona';
import { BeanScopeBase } from 'vona';
import { Scope } from 'vona-module-a-bean';

import 'vona';

@Scope()
export class ScopeModuleASocket extends BeanScopeBase {}

export interface ScopeModuleASocket {
  util: BeanScopeUtil;
}
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-socket': ScopeModuleASocket;
  }

  export interface IBeanScopeContainer {
    socket: ScopeModuleASocket;
  }
}

/** scope: end */
