import { BeanModuleScopeBase, cast } from 'vona';
import { BeanBase2 } from '../bean.base.js';

export class BeanBase0 extends BeanModuleScopeBase {
  protected get self() {
    return cast<BeanBase2>(this);
  }
}
