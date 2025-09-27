import type { IBeanRecord } from 'vona';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventDisposeInstancesData {
  beanFullName: keyof IBeanRecord;
  data: unknown;
}

export type TypeEventDisposeInstancesResult = void;

@Event()
export class EventDisposeInstances extends BeanEventBase<
  TypeEventDisposeInstancesData,
  TypeEventDisposeInstancesResult
> {}
