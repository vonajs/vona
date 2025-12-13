import type { IDecoratorBeanOptionsBase } from 'vona';
import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase } from 'vona';
import { Hmr } from 'vona-module-a-hmr';
import { clearAllCacheModelsClear, clearCacheModelCacheInstance } from '../lib/const.ts';

@Hmr()
export class HmrModel extends BeanBase implements IHmrReload {
  async reload(beanOptions: IDecoratorBeanOptionsBase) {
    clearAllCacheModelsClear(this.app);
    await clearCacheModelCacheInstance(this.app, beanOptions.beanFullName);
  }
}
