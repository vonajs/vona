import type { IDecoratorBeanOptionsBase } from 'vona';
import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase } from 'vona';
import { Hmr } from 'vona-module-a-hmr';
import { clearAllCacheMemories } from '../lib/const.ts';

@Hmr()
export class HmrCacheMem extends BeanBase implements IHmrReload {
  async reload(_beanOptions: IDecoratorBeanOptionsBase) {
    clearAllCacheMemories(this.app);
  }
}
