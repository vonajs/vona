import type { IDecoratorBeanOptionsBase } from 'vona';
import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase } from 'vona';
import { Hmr } from 'vona-module-a-hmr';
import { SymbolCacheMiddlewareSystems } from '../types/cache.ts';

@Hmr()
export class HmrMiddlewareSystem extends BeanBase implements IHmrReload {
  async reload(_beanOptions: IDecoratorBeanOptionsBase) {
    delete this.app.meta[SymbolCacheMiddlewareSystems];
  }
}
