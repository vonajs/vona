import { BeanBase } from '@cabloy/core';

export class BeanFieldsBase extends BeanBase {
  get modelRoleFieldsRight() {
    return this.ctx.model.module('a-base').roleFieldsRight;
  }
}
