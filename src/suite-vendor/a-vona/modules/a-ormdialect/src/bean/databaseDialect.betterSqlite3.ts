import type { IDecoratorDatabaseDialectOptions } from 'vona-module-a-orm';
import { BeanDatabaseDialectBase, DatabaseDialect } from 'vona-module-a-orm';

export interface IDatabaseDialectOptionsBetterSqlite3 extends IDecoratorDatabaseDialectOptions {}

@DatabaseDialect<IDatabaseDialectOptionsBetterSqlite3>()
export class DatabaseDialectBetterSqlite3 extends BeanDatabaseDialectBase {}
