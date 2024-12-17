import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventShareRecordUVData = { share; user };

export type TypeEventShareRecordUVResult = any;

@Event()
export class EventShareRecordUV extends BeanEventBase<TypeEventShareRecordUVData, TypeEventShareRecordUVResult> {}
