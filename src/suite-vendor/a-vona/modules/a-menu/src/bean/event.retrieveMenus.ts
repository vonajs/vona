import type { IMenus } from '../types/menu.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventRetrieveMenusData = unknown;

export type TypeEventRetrieveMenusResult = IMenus;

@Event()
export class EventRetrieveMenus extends BeanEventBase<
  TypeEventRetrieveMenusData,
  TypeEventRetrieveMenusResult
> {}
