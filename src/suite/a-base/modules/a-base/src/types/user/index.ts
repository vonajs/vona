import { EntityUser } from '../../entity/user.js';

export interface StateUser {
  op: { id: number } & Partial<EntityUser>;
  agent: { id: number } & Partial<EntityUser>;
  provider: {
    id: number;
    module: string;
    providerName: string;
    providerScene: string;
  };
}

declare module '@cabloy/core' {
  export interface ContextState {
    user: StateUser; // not use null | undefined
  }
}
