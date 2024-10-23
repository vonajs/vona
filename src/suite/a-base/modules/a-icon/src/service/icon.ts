import { BeanBase, Local } from 'vona';

@Local()
export class LocalIcon extends BeanBase {
  getIcons() {
    return this.ctx.bean.icon.getIcons();
  }
}
