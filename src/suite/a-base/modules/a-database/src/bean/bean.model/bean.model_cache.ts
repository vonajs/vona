import { BeanModel } from '../virtual.model.js';

export class BeanModelCache<TRecord extends {} = any, TScopeModule = unknown> extends BeanModel<
  TRecord,
  TScopeModule
> {}
