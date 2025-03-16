import type { TableIdentity } from 'vona-module-a-database';
import { BeanEventBase, Event } from 'vona-module-a-event';

export interface TypeEventAccountMigrationData {
  userIdFrom: TableIdentity;
  userIdTo: TableIdentity;
}

export type TypeEventAccountMigrationResult = void;

@Event()
export class EventAccountMigration extends BeanEventBase<
  TypeEventAccountMigrationData,
  TypeEventAccountMigrationResult
> {}
