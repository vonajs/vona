export * from '../bean/middleware.validate.js';
export * from '../bean/bean.validation.js';

import { BeanValidation } from '../bean/bean.validation.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    validation: BeanValidation;
  }
}
