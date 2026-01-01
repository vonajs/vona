import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventClearAllCachesData = unknown;

export type TypeEventClearAllCachesResult = void;

@Event()
export class EventClearAllCaches extends BeanEventBase<
  TypeEventClearAllCachesData,
  TypeEventClearAllCachesResult
> {}
