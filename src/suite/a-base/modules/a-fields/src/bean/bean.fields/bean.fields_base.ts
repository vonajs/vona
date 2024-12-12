import { BeanBase, cast } from 'vona';
import { BeanFields } from '../bean.fields.js';

export class BeanFieldsBase extends BeanBase {
  protected get self() {
    return cast<BeanFields>(this);
  }

  get modelRoleFieldsRight() {
    return this.$scope.base.model.roleFieldsRight;
  }
}
