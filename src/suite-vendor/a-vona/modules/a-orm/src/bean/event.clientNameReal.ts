import type { IDatabaseClientRecord } from '../types/database.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventClientNameRealData = keyof IDatabaseClientRecord;

export type TypeEventClientNameRealResult = keyof IDatabaseClientRecord;

@Event()
export class EventClientNameReal extends BeanEventBase<
  TypeEventClientNameRealData,
  TypeEventClientNameRealResult
> {}
