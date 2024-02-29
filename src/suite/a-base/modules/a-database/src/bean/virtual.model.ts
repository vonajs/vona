import { BeanBase, Virtual } from '@cabloy/core';

@Virtual({ scene: 'bean' })
export class BeanModel<T = unknown> extends BeanBase {
  get scope() {
    return this.getScope() as T;
  }

  get schema() {
    return this.ctx.db.schema;
  }

  builder(_options) {
    return this.ctx.db();
  }
}
