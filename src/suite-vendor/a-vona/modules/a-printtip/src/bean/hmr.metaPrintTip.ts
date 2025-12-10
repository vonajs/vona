import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase } from 'vona';
import { Hmr } from 'vona-module-a-hmr';

@Hmr()
export class HmrMetaPrintTip extends BeanBase implements IHmrReload {
  async reload() {
    await this.$scope.instance.service.instance.instanceStartup(this.ctx.instanceName!, { force: true });
  }
}
