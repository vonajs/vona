import type { IMenus } from 'vona-module-a-menu';
import type { BeanSsrSiteBase } from '../lib/beanSsrSiteBase.ts';
import type { IDecoratorSsrSiteOptions } from '../types/ssrSite.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventRetrieveMenusData {
  publicPath: string;
  siteOptions: IDecoratorSsrSiteOptions;
  siteInstance: BeanSsrSiteBase;
}

export type TypeEventRetrieveMenusResult = IMenus | undefined;

@Event()
export class EventRetrieveMenus extends BeanEventBase<
  TypeEventRetrieveMenusData,
  TypeEventRetrieveMenusResult
> {}
