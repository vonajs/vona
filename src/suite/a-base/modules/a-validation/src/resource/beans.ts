export * from '../bean/middleware.validate.js';
export * from '../bean/bean.validation.js';
export * from '../bean/bean.ajv.js';

import { BeanValidation } from '../bean/bean.validation.js';
import { BeanAjv } from '../bean/bean.ajv.js';

declare module 'vona' {
  export interface IBeanRecord {
    validation: BeanValidation;
    ajv: BeanAjv;
  }
}
