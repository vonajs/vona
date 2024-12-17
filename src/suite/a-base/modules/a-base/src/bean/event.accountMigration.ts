import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventAccountMigrationData = { userIdFrom; userIdTo };

export type TypeEventAccountMigrationResult = void;

@Event()
export class EventAccountMigration extends BeanEventBase<
  TypeEventAccountMigrationData,
  TypeEventAccountMigrationResult
> {}
