import { Virtual } from '@cabloy/core';
import { BeanModelCrud } from './bean.model/bean.model_crud.js';

@Virtual({ scene: 'bean' })
export class BeanModel<TRecord extends {} = any, TResult = any[], TScopeModule = unknown> extends BeanModelCrud<
  TRecord,
  TResult
> {
  get scope() {
    return this.getScope() as TScopeModule;
  }
}
