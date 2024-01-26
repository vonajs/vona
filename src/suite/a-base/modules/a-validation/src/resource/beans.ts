export * from '../bean/middleware.validate.js';
export * from '../bean/bean.validation.js';

import { BeanValidation } from '../bean/bean.validation.js';

export interface IBeanRecord {
  validation: BeanValidation;
}
