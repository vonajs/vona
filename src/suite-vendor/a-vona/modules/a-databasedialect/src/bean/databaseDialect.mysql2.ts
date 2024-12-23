import { BeanTemp } from 'vona-module-a-bean';

import { DatabaseDialectMysql } from './database.dialect.mysql.js';
import { Knex } from 'knex';

@BeanTemp({ scene: 'database.dialect' })
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
