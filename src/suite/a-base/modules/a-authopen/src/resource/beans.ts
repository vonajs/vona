export * from '../bean/version.manager.js';
export * from '../bean/event.accountMigration.js';
export * from '../bean/bean.authOpen.js';
export * from '../bean/auth.provider.open.js';

import { BeanAuthOpen } from '../bean/bean.authOpen.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    authOpen: BeanAuthOpen;
  }
}
