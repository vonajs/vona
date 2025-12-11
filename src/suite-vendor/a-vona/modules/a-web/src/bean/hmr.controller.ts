import type { IDecoratorBeanOptionsBase } from 'vona';
import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase } from 'vona';
import { Hmr } from 'vona-module-a-hmr';

@Hmr()
export class HmrController extends BeanBase implements IHmrReload {
  async reload(beanOptions: IDecoratorBeanOptionsBase) {
    this.bean.router.reRegisterController(beanOptions.beanFullName);
  }
}
