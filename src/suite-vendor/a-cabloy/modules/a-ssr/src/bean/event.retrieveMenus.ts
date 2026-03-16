import type { IMenus } from 'vona-module-a-menu';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventRetrieveMenusData {
  publicPath?: string;
}

export type TypeEventRetrieveMenusResult = IMenus | undefined;

@Event()
export class EventRetrieveMenus extends BeanEventBase<
  TypeEventRetrieveMenusData,
  TypeEventRetrieveMenusResult
> {}
