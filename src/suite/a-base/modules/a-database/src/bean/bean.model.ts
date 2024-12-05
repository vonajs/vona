import { Virtual } from 'vona';
import { BeanModelCrud2 } from './bean.model/bean.model_crud2.js';

@Virtual()
export class BeanModel<TRecord extends {} = any, TScopeModule = unknown> extends BeanModelCrud2<TRecord> {
  get scope() {
    return this.getScope() as TScopeModule;
  }
}
