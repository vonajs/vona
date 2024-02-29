import { BeanBase, Virtual } from '@cabloy/core';
import { Knex } from 'knex';

@Virtual({ scene: 'bean' })
export class BeanModel<TRecord extends {} = any, TResult = any[], TScopeModule = unknown> extends BeanBase {
  get scope() {
    return this.getScope() as TScopeModule;
  }

  get schema(): Knex.SchemaBuilder {
    return this.ctx.db.schema;
  }

  builder<TRecord2 extends {} = TRecord, TResult2 = TResult>(
    tableName?: Knex.TableDescriptor | Knex.AliasDict,
  ): Knex.QueryBuilder<TRecord2, TResult2> {
    if (tableName) {
      return this.ctx.db(tableName);
    }
    return this.ctx.db.queryBuilder();
  }
}
