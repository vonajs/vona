import { EntityUser } from '../../entity/user.js';

export interface StateUser {
  op: EntityUser;
  agent: EntityUser;
}

declare module '@cabloy/core' {
  export interface ContextState {
    user: StateUser;
  }
}
