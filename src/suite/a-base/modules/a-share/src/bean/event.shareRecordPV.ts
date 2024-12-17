import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventShareRecordPVData = { share; user };

export type TypeEventShareRecordPVResult = any;

@Event()
export class EventShareRecordPV extends BeanEventBase<TypeEventShareRecordPVData, TypeEventShareRecordPVResult> {}
