import { BeanBase } from 'vona';
import { ScopeModule } from '../../.metadata/this.js';

export class BeanFieldsBase extends BeanBase {
  get modelRoleFieldsRight() {
    return this.$scope.base.model.roleFieldsRight;
  }
}
