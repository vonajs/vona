import { Knex } from 'knex';
import { BeanModelUtils } from './bean.model_utils.js';
import { IModelMethodOptionsGeneral } from '../../types.js';
import { Cast } from '@cabloy/core';

export class BeanModelKnex<TRecord extends {}> extends BeanModelUtils<TRecord> {
  get schema(): Knex.SchemaBuilder {
    return this.ctx.db.schema;
  }

  get modelViewRecord() {
    return this.getScope('a-version').model.viewRecord;
  }

  builder<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?: Knex.TableDescriptor,
  ): Knex.QueryBuilder<TRecord2, TResult2[]> {
    // table
    table = table || this.table;
    if (table) {
      return this.ctx.db(table);
    }
    return this.ctx.db.queryBuilder<TRecord2, TResult2[]>();
  }

  builderSelect<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    options?: IModelMethodOptionsGeneral,
  ): Knex.QueryBuilder<TRecord2, TResult2[]>;
  builderSelect<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table: string,
    options?: IModelMethodOptionsGeneral,
  ): Knex.QueryBuilder<TRecord2, TResult2[]>;
  builderSelect<TRecord2 extends {} = TRecord, TResult2 = TRecord2>(
    table?,
    options?,
  ): Knex.QueryBuilder<TRecord2, TResult2[]> {
    if (typeof table !== 'string') {
      options = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeModuleADatabase.error.ShouldSpecifyTable.throw();
    // builder
    const builder = this.builder<TRecord2, TResult2>(table);
    // where
    this.prepareWhere(builder, table, null, options);
    // ready
    return builder;
  }
}
