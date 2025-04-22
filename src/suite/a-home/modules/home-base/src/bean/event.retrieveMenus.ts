import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventRetrieveMenusData = unknown;

export type TypeEventRetrieveMenusResult = void;

@Event()
export class EventRetrieveMenus extends BeanEventBase<
  TypeEventRetrieveMenusData,
  TypeEventRetrieveMenusResult
> {}
