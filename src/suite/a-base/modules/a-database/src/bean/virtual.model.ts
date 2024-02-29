import { BeanBase, Cast, IDecoratorModelOptions, IModelOptions, Virtual, appResource } from '@cabloy/core';
import { Knex } from 'knex';
import { ITableColumns } from './virtual.databaseDialect.js';

let __columns: Record<string, ITableColumns> = {};

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

  protected get __beanOptions() {
    return appResource.getBean((<any>this).__beanFullName__);
  }

  protected get __modelOptions() {
    const beanOptions = this.__beanOptions;
    return beanOptions?.options as IDecoratorModelOptions;
  }

  get table(): string {
    return this.__modelOptions.table;
  }

  get options(): IModelOptions {
    return this.__modelOptions.options;
  }

  get disableDeleted() {
    return this.options.disableDeleted === undefined
      ? this.app.config.model.disableDeleted
      : this.options.disableDeleted;
  }

  get disableInstance() {
    return this.options.disableInstance === undefined
      ? this.app.config.model.disableInstance
      : this.options.disableInstance;
  }

  async columns(tableName?: string) {
    tableName = tableName || this.table;
    let columns = __columns[tableName];
    if (!columns) {
      const client = Cast<Knex.Client>(Cast(this.ctx.db).client).config.client as string;
      const dialect = this.app.bean.database.getDialect(client);
      const list = await this.builder(tableName).columnInfo();
      columns = __columns[tableName] = {};
      for (const name in list) {
        columns[name] = dialect.coerceColumn(list[name]);
      }
    }
    return columns;
  }

  columnsClear(tableName) {
    tableName = tableName || this.table;
    const exists = __columns[tableName];
    delete __columns[tableName];
    return exists;
  }

  columnsClearAll() {
    const exists = Object.keys(__columns).length > 0;
    __columns = {};
    return exists;
  }
}
