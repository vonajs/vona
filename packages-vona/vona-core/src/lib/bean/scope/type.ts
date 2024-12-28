import { IBeanRecord } from '../type.js';
import { BeanModuleScopeBase } from '../beanModuleScopeBase.js';

export type TypeModuleBean = {
  [property in keyof IBeanRecord as IBeanRecord[property] extends BeanModuleScopeBase
    ? property
    : never]: IBeanRecord[property];
};
