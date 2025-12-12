import type { IDecoratorBeanOptionsBase } from 'vona';
import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase } from 'vona';
import { clearCacheComposesRouter } from 'vona-module-a-aspect';
import { Hmr } from 'vona-module-a-hmr';

@Hmr()
export class HmrController extends BeanBase implements IHmrReload {
  async reload(beanOptions: IDecoratorBeanOptionsBase) {
    clearCacheComposesRouter(this.app);
    this.bean.router.reRegisterController(beanOptions.beanFullName);
    await this.$scope.openapi.service.openapi.clearAllCaches();
  }
}
