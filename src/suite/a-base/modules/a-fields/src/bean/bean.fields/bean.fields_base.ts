import { BeanBase } from '@cabloy/core';

export class BeanFieldsBase extends BeanBase {
  get modelRoleFieldsRight() {
    return this.getScope('a-base').model.roleFieldsRight;
  }
}
