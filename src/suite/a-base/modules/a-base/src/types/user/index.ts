import { EntityUser } from '../../entity/user.js';

export interface StateUser {
  op: { id: number } & Partial<EntityUser>;
  // todo: 不再需要
  agent?: { id: number } & Partial<EntityUser>;
  // todo: 不再需要
  provider?: {
    id: number;
    module: string;
    providerName: string;
    providerScene: string;
  };
}

import 'vona';
declare module 'vona' {
  export interface ContextState {
    user: StateUser; // not use null | undefined
  }
}
