import { DatabaseDialect } from 'vona-module-a-database';
import { Knex } from 'knex';
import { DatabaseDialectMysql } from './databaseDialect.mysql.js';

@DatabaseDialect()
export class DatabaseDialectMysql2 extends DatabaseDialectMysql {
  getConfigBase(): Knex.Config {
    const configBase = super.getConfigBase();
    return Object.assign({}, configBase, {
      connection: {
        // typeCast(field, next) {
        //   if (field.type === 'JSON') {
        //     return field.string('utf-8'); // utf8 https://github.com/sidorares/node-mysql2/pull/1662
        //   }
        //   return next();
        // },
      },
    });
  }
}
