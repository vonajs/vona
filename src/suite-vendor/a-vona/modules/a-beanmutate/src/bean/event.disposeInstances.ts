import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventDisposeInstancesData = unknown;

export type TypeEventDisposeInstancesResult = void;

@Event()
export class EventDisposeInstances extends BeanEventBase<
  TypeEventDisposeInstancesData,
  TypeEventDisposeInstancesResult
> {}
