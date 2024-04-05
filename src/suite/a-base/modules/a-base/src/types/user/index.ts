import { EntityUser } from '../../entity/user.js';

export interface StateUser {
  op: Partial<EntityUser>;
  agent: Partial<EntityUser>;
}

declare module '@cabloy/core' {
  export interface ContextState {
    user: StateUser; // not use null | undefined
  }
}
