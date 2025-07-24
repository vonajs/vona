import type { ConfigDatabaseClient } from 'vona-module-a-database';
import { Virtual } from 'vona';
import { DatabaseDialect } from 'vona-module-a-database';
import { DatabaseDialectMysql } from './databaseDialect.mysql.ts';

@DatabaseDialect()
@Virtual()
export class DatabaseDialectMysql3 extends DatabaseDialectMysql {
  getConfigBase(): ConfigDatabaseClient | undefined {
    return super.getConfigBase();
    // const configBase = super.getConfigBase();
    // return Object.assign({}, configBase, {
    //   connection: {
    //     // typeCast(field, next) {
    //     //   if (field.type === 'JSON') {
    //     //     return field.string('utf-8'); // utf8 https://github.com/sidorares/node-mysql2/pull/1662
    //     //   }
    //     //   return next();
    //     // },
    //   },
    // });
  }
}
