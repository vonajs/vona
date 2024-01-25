import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalIcon extends BeanBase {
  getIcons() {
    return this.ctx.bean.icon.getIcons();
  }
}
