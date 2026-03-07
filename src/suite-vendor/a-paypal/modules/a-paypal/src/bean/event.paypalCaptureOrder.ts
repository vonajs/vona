import type { EntityPaypalRecord } from '../entity/paypalRecord.tsx';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventPaypalCaptureOrderData {
  record: EntityPaypalRecord;
  grossAmount: number;
  payFee: number;
  netAmount: number;
  orderResult?: {};
}

export type TypeEventPaypalCaptureOrderResult = void;

@Event()
export class EventPaypalCaptureOrder extends BeanEventBase<
  TypeEventPaypalCaptureOrderData,
  TypeEventPaypalCaptureOrderResult
> {}
