import { Knex } from 'knex';
import { BeanModelUtils } from './bean.model_utils.js';
import { IModelMethodOptions } from '../../types.js';

export class BeanModelKnex<TRecord extends {}> extends BeanModelUtils<TRecord> {
  get schema(): Knex.SchemaBuilder {
    return this.ctx.db.schema;
  }

  builder<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?: Knex.TableDescriptor | Knex.AliasDict,
  ): Knex.QueryBuilder<TRecord2, TResult2[]> {
    // table
    table = table || this.table;
    if (table) {
      return this.ctx.db(table);
    }
    return this.ctx.db.queryBuilder<TRecord2, TResult2[]>();
  }

  builderSelect<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    options?: IModelMethodOptions,
  ): Knex.QueryBuilder<TRecord2, TResult2[]>;
  builderSelect<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: Knex.TableDescriptor | Knex.AliasDict,
    options?: IModelMethodOptions,
  ): Knex.QueryBuilder<TRecord2, TResult2[]>;
  builderSelect<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?,
    options?,
  ): Knex.QueryBuilder<TRecord2, TResult2[]> {
    if (typeof table !== 'string') {
      table = undefined;
      options = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // builder
    const builder = this.builder<TRecord2, TResult2>(table);
    // where
    this.prepareWhere(builder, table, null, options);
    // ready
    return builder;
  }
}
