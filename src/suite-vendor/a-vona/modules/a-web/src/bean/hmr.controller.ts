import type { IDecoratorBeanOptionsBase } from 'vona';
import type { IHmrReload } from 'vona-module-a-hmr';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { clearCacheComposesRouter } from 'vona-module-a-aspect';
import { Hmr } from 'vona-module-a-hmr';

@Hmr()
export class HmrController extends BeanBase implements IHmrReload {
  async reload(beanOptions: IDecoratorBeanOptionsBase) {
    clearCacheComposesRouter(this.app);
    this.bean.router.reRegisterController(beanOptions.beanFullName);
    const cacheOpenapiSchema = this.bean.summer.cache(beanFullNameFromOnionName('a-openapi:json', 'summerCache'));
    await cacheOpenapiSchema.clear();
    const cacheSwagger = this.bean.summer.cache(beanFullNameFromOnionName('a-swagger:swagger', 'summerCache'));
    await cacheSwagger.clear();
    const cacheRapidoc = this.bean.summer.cache(beanFullNameFromOnionName('a-swagger:rapidoc', 'summerCache'));
    await cacheRapidoc.clear();
  }
}
