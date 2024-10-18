import { BeanAuthSimple } from '../bean/bean.authSimple.js';

export * from '../bean/version.manager.js';
export * from '../bean/event.accountMigration.js';
export * from '../bean/bean.authSimple.js';
export * from '../bean/auth.provider.simple.js';

declare module 'vona' {
  export interface IBeanRecord {
    authSimple: BeanAuthSimple;
  }
}
