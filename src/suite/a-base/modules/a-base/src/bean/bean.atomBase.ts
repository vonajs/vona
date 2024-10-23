import { Virtual } from 'vona';
import { BeanAtomBasePerformActionBulk } from './bean.atomBase/bean.atomBase_performActionBulk.js';

@Virtual({ scene: 'bean' })
export class BeanAtomBase<T = unknown> extends BeanAtomBasePerformActionBulk {
  get scope() {
    return this.getScope() as T;
  }
}
