import { Knex } from 'knex';
import { promisify } from 'node:util';

export const configBases: Record<string, Knex.Config> = {
  mysql: {
    pool: {
      afterCreate(conn, done) {
        mysql_afterCreate(conn).then(done).catch(done);
      },
    },
  },
  mysql2: {
    pool: {
      afterCreate(conn, done) {
        mysql_afterCreate(conn).then(done).catch(done);
      },
    },
    connection: {
      // typeCast(field, next) {
      //   if (field.type === 'JSON') {
      //     return field.string('utf-8'); // utf8 https://github.com/sidorares/node-mysql2/pull/1662
      //   }
      //   return next();
      // },
    },
  },
  pg: {
    connection: {
      // types: {
      //   getTypeParser: (oid: number, format: string): any => {
      //     if (oid === 114) return pgTypes.getTypeParser(25, 'text');
      //     return pgTypes.getTypeParser(oid, cast(format));
      //   },
      // },
    },
  },
};

async function mysql_afterCreate(conn) {
  await _executeQuery(conn, 'SET SESSION explicit_defaults_for_timestamp=ON');
  await _executeQuery(conn, "SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO'");
}

async function _executeQuery(conn, sql) {
  const queryAsync = promisify(cb => conn.query(sql, cb));
  return await queryAsync();
}
