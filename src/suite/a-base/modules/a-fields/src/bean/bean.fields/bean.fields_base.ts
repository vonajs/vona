import { BeanBase } from 'vona';

export class BeanFieldsBase extends BeanBase {
  get modelRoleFieldsRight() {
    return this.$scope.base.model.roleFieldsRight;
  }
}
