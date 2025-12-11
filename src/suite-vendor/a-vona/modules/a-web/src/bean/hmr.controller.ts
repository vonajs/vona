import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase } from 'vona';
import { Hmr } from 'vona-module-a-hmr';

@Hmr()
export class HmrController extends BeanBase implements IHmrReload {
  async reload() {
    this.bean.router.reRegisterController();
  }
}
