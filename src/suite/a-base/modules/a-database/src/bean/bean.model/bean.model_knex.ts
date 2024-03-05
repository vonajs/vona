import { Knex } from 'knex';
import { BeanModelUtils } from './bean.model_utils.js';

export class BeanModelKnex<TRecord extends {}> extends BeanModelUtils<TRecord> {
  get schema(): Knex.SchemaBuilder {
    return this.ctx.db.schema;
  }

  builder<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    tableName?: Knex.TableDescriptor | Knex.AliasDict,
  ): Knex.QueryBuilder<TRecord2, TResult2> {
    if (tableName) {
      return this.ctx.db(tableName);
    }
    return this.ctx.db.queryBuilder();
  }
}
