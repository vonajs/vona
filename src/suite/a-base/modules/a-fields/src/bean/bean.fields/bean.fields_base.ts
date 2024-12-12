import { BeanBase, cast } from 'vona';
import { BeanFields } from 'vona-module-a-fields';

export class BeanFieldsBase extends BeanBase {
  protected get self() {
    return cast<BeanFields>(this);
  }

  get modelRoleFieldsRight() {
    return this.$scope.base.model.roleFieldsRight;
  }
}
