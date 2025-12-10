import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase } from 'vona';
import { Hmr } from 'vona-module-a-hmr';

@Hmr()
export class HmrMetaVersion extends BeanBase implements IHmrReload {
  async reload() {
    this.app.bean.worker.reload();
  }
}
