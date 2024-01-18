import { ScopeModule } from './scope.js';

export const __ThisModule__ = 'a-version';
export type __ThisModuleType__ = typeof __ThisModule__;

declare module '@cabloy/core' {
  export interface BeanBase {
    scope: ScopeModule;
  }
}
