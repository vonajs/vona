import type { IEventExecute, NextEvent } from 'vona-module-a-event';
import type { TypeEventRetrieveMenusData, TypeEventRetrieveMenusResult } from 'vona-module-a-menu';
import type { BeanSsrSiteBase } from '../lib/beanSsrSiteBase.ts';
import type { IDecoratorSsrSiteOptions } from '../types/ssrSite.ts';
import { BeanBase } from 'vona';
import { EventListener } from 'vona-module-a-event';

type TypeEventData = TypeEventRetrieveMenusData;
type TypeEventResult = TypeEventRetrieveMenusResult;

@EventListener({ match: 'a-menu:retrieveMenus' })
export class EventListenerRetrieveMenus
  extends BeanBase
  implements IEventExecute<TypeEventData, TypeEventResult> {
  async execute(data: TypeEventData, next: NextEvent<TypeEventData, TypeEventResult>): Promise<TypeEventResult> {
    // publicPath
    const publicPath = data.publicPath ?? '';
    // check sites
    const sites = this.scope.service.ssr.getSitesEnabled();
    const site = sites.find(site => {
      const siteOptions = site.beanOptions.options as IDecoratorSsrSiteOptions;
      return siteOptions.publicPath === publicPath;
    });
    if (!site) return next();
    // retrieveMenus
    const beanInstance = this.bean._getBean<BeanSsrSiteBase>(site.beanOptions.beanFullName as any);
    const res = await beanInstance.retrieveMenus();
    if (res) return res;
    // next
    return next();
  }
}
