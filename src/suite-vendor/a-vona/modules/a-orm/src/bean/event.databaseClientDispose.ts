import type { IDatabaseClientRecord } from '../types/database.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventDatabaseClientDisposeData {
  clientName: keyof IDatabaseClientRecord;
}

export type TypeEventDatabaseClientDisposeResult = void;

@Event()
export class EventDatabaseClientDispose extends BeanEventBase<
  TypeEventDatabaseClientDisposeData,
  TypeEventDatabaseClientDisposeResult
> {}
