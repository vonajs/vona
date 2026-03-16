import type { IMenus } from 'vona-module-a-menu';
import type { TypeEventResolvePathResult } from 'vona-module-a-static';
import type { BeanSsrSiteBase } from '../lib/beanSsrSiteBase.ts';
import type { IDecoratorSsrSiteOptions, ISsrHandlerRenderOptions, ISsrSiteRecord } from '../types/ssrSite.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanSsr extends BeanBase {
  async redirect<
    SITE extends keyof ISsrSiteRecord,
    PAGEPATH extends keyof ISsrSiteRecord[SITE]['pages'],
    PAGEOPTIONS extends Omit<ISsrSiteRecord[SITE]['pages'][PAGEPATH], 'data'>,
  >(site: SITE,
    pagePath: PAGEPATH,
    pageOptions?: PAGEOPTIONS,
  ): Promise<undefined | never> {
    // site bean
    const beanInstance = this.bean._getBean(beanFullNameFromOnionName(site, 'ssrSite')) as BeanSsrSiteBase;
    if (!beanInstance) return;
    // render
    return await beanInstance.redirect(pagePath as any, pageOptions as any);
  }

  async render<
    SITE extends keyof ISsrSiteRecord,
    PAGEPATH extends keyof ISsrSiteRecord[SITE]['pages'],
    PAGEOPTIONS extends ISsrSiteRecord[SITE]['pages'][PAGEPATH],
  >(site: SITE,
    pagePath: PAGEPATH,
    pageOptions?: PAGEOPTIONS,
    renderOptions?: ISsrHandlerRenderOptions,
  ): Promise<TypeEventResolvePathResult> {
    // site bean
    const beanInstance = this.bean._getBean(beanFullNameFromOnionName(site, 'ssrSite')) as BeanSsrSiteBase;
    if (!beanInstance) return;
    // render
    return await beanInstance.render(pagePath as any, pageOptions as any, renderOptions);
  }

  async retrieveMenus(publicPath?: string): Promise<IMenus | undefined> {
    publicPath = publicPath ?? '';
    return await this.scope.event.retrieveMenus.emit({ publicPath }, async () => {
      return await this.bean.ssr.retrieveMenus(publicPath);
    });
  }
}
