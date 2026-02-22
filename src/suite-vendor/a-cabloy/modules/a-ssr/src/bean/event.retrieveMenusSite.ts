import type { ILocaleRecord } from 'vona';
import type { TypeEventRetrieveMenusResult } from 'vona-module-a-menu';
import type { BeanSsrSiteBase } from '../lib/beanSsrSiteBase.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventRetrieveMenusSiteData {
  ssrSite: BeanSsrSiteBase;
  locale: keyof ILocaleRecord;
}

export type TypeEventRetrieveMenusSiteResult = TypeEventRetrieveMenusResult;

@Event()
export class EventRetrieveMenusSite extends BeanEventBase<
  TypeEventRetrieveMenusSiteData,
  TypeEventRetrieveMenusSiteResult
> {}
