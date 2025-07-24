import type { IDatabaseClientRecord } from '../types/database.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventColumnsClearData {
  clientName: keyof IDatabaseClientRecord;
  tableName?: string;
}

export type TypeEventColumnsClearResult = void;

@Event()
export class EventColumnsClear extends BeanEventBase<
  TypeEventColumnsClearData,
  TypeEventColumnsClearResult
> {}
