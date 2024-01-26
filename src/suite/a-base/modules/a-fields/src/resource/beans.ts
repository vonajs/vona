export * from '../bean/version.manager.js';
export * from '../bean/summer.cache.fieldsRightOfUser.js';
export * from '../bean/summer.cache.fieldsRightOfAtomClass.js';
export * from '../bean/bean.fields.js';

import { BeanFields } from '../bean/bean.fields.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    fields: BeanFields;
  }
}
