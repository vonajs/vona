import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventReloadInstancesData = unknown;

export type TypeEventReloadInstancesResult = void;

@Event()
export class EventReloadInstances extends BeanEventBase<
  TypeEventReloadInstancesData,
  TypeEventReloadInstancesResult
> {}
