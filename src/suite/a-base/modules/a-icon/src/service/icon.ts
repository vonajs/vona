import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceIcon extends BeanBase {
  getIcons() {
    return this.app.bean.icon.getIcons();
  }
}
