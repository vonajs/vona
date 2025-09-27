import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventDatabaseClientReloadData {
  clientName: keyof IDatabaseClientRecord;
  clientConfig?: ConfigDatabaseClient;
  extraData?: any;
}

export type TypeEventDatabaseClientReloadResult = void;

@Event()
export class EventDatabaseClientReload extends BeanEventBase<
  TypeEventDatabaseClientReloadData,
  TypeEventDatabaseClientReloadResult
> {}
