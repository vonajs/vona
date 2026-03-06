import type { EntityPaypalRecord } from '../entity/paypalRecord.tsx';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventPaypalCancelOrderData {
  record: EntityPaypalRecord;
}

export type TypeEventPaypalCancelOrderResult = void;

@Event()
export class EventPaypalCancelOrder extends BeanEventBase<
  TypeEventPaypalCancelOrderData,
  TypeEventPaypalCancelOrderResult
> {}
