import { BeanBase, Service } from 'vona';

@Service()
export class ServiceIcon extends BeanBase {
  getIcons() {
    return this.ctx.bean.icon.getIcons();
  }
}
