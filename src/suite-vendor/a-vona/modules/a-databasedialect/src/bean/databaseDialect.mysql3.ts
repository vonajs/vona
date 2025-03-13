import type { Knex } from 'knex';
import { DatabaseDialect } from 'vona-module-a-database';
import { DatabaseDialectMysql } from './databaseDialect.mysql.ts';

@DatabaseDialect()
export class DatabaseDialectMysql3 extends DatabaseDialectMysql {
  getConfigBase(): Knex.Config | undefined {
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
