import type {
  IModelCountParams,
  IModelGetOptionsGeneral,
  IModelMethodOptionsGeneral,
  IModelSelectParams,
  IModelUpdateOptionsGeneral,
  ITableRecord,
  TableIdentity,
  TypeModelWhere,
} from '../../types/index.ts';
import { BigNumber } from 'bignumber.js';
import { cast } from 'vona';
import { BeanModelView } from './bean.model_view.ts';

export class BeanModelCrud<TRecord extends {}> extends BeanModelView<TRecord> {
  /** not hold undefined item if not exists */
  async mget(ids: TableIdentity[], options?: IModelGetOptionsGeneral<TRecord>): Promise<TRecord[]> {
    // mget
    const items = await this._mget(undefined, ids, options);
    // filter
    return items.filter(item => !!item) as any;
  }

  /** hold undefined item if not exists */
  protected async _mget(
    table?: keyof ITableRecord,
    ids?: TableIdentity[],
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<(TRecord | undefined)[]> {
    // table
    table = table || this.getTable('_mget', [table, ids], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // ids maybe empty
    if (!ids || ids.length === 0) return [];
    // params
    const params: IModelSelectParams<TRecord> = {
      where: {
        id: ids,
      } as any,
    };
    if (options?.columns) {
      params.columns = options?.columns;
    }
    // select
    const options2 = options?.columns ? Object.assign({}, options, { columns: undefined }) : options;
    const items = await this._select(table, params, options2);
    // sort
    const result: (TRecord | undefined)[] = [];
    for (const id of ids) {
      // item maybe undefined
      result.push(items.find(item => cast(item).id === id));
    }
    return result;
  }

  async select(params?: IModelSelectParams<TRecord>, options?: IModelMethodOptionsGeneral): Promise<TRecord[]> {
    return await this._select(undefined, params, options);
  }

  protected async _select(
    table?: keyof ITableRecord,
    params?: IModelSelectParams<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord[]> {
    // table
    table = table || this.getTable('_select', [table, params], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // params
    params = params || {};
    // table alias
    table = params.alias ? `${table} as ${params.alias}` as any : table;
    // builder
    const builder = this.builder<TRecord, TRecord>(table);
    // columns
    builder.select(params.columns as any);
    // distinct
    this.buildDistinct(builder, params.distinct);
    // joins
    this.buildJoins(builder, params.joins);
    // where
    const wheres = this.prepareWhere(builder, table, params.where, options);
    if (wheres === false) {
      return [] as TRecord[];
    }
    // orders
    this.buildOrders(builder, params.orders);
    // limit
    this.buildLimit(builder, params.limit);
    // offset
    this.buildOffset(builder, params.offset);
    // page
    this.buildPage(builder, params.page);
    // ready
    this.$loggerChild('model').debug('model.select: %s', builder.toQuery());
    return (await builder) as TRecord[];
  }

  async get(where?: TypeModelWhere<TRecord>, options?: IModelGetOptionsGeneral<TRecord>): Promise<TRecord | undefined> {
    return await this._get(undefined, where, options);
  }

  protected async _get(
    table?: keyof ITableRecord,
    where?: TypeModelWhere<TRecord>,
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<TRecord | undefined> {
    // table
    table = table || this.getTable('_get', [table, where], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // params
    const params: IModelSelectParams<TRecord> = { where, limit: 1 };
    if (options?.columns) {
      params.columns = options?.columns;
    }
    // select
    const items = await this._select(table, params, options);
    const item = items[0];
    if (!item) return undefined;
    return item as unknown as TRecord;
  }

  async count(params?: IModelCountParams<TRecord>, options?: IModelMethodOptionsGeneral): Promise<BigNumber> {
    return await this._count(undefined, params, options);
  }

  protected async _count(table?: keyof ITableRecord, params?: IModelCountParams<TRecord>, options?: IModelMethodOptionsGeneral): Promise<BigNumber> {
    // table
    table = table || this.getTable('count', [table, params], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // params
    params = params || {};
    // table alias
    table = params.alias ? `${table} as ${params.alias}` as any : table;
    // builder
    const builder = this.builder<TRecord>(table);
    // count
    this.buildCount(builder, params.count, params.distinct);
    // joins
    this.buildJoins(builder, params.joins);
    // where
    const wheres = this.prepareWhere(builder, table, params.where, options);
    if (wheres === false) {
      return BigNumber(0);
    }
    // ready
    this.$loggerChild('model').debug('model.count: %s', builder.toQuery());
    const res = await builder;
    return this.extractCount(res);
  }

  async insert(data?: Partial<TRecord>, options?: IModelMethodOptionsGeneral): Promise<TRecord> {
    return await this._batchInsert(undefined, data, options) as Promise<TRecord>;
  }

  async batchInsert(data: Partial<TRecord>[], options?: IModelMethodOptionsGeneral): Promise<TRecord[]> {
    return await this._batchInsert(undefined, data, options) as Promise<TRecord[]>;
  }

  protected async _batchInsert(
    table?: keyof ITableRecord,
    data?: Partial<TRecord> | Partial<TRecord>[],
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord | TRecord[]> {
    // table
    table = table || this.getTable('batchInsert', [table, data], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // data
    data = data || {} as any;
    const datasTemp = Array.isArray(data) ? data : [data];
    // options
    const datas: any[] = [];
    const datasOriginal: any[] = [];
    for (const dataTemp of datasTemp) {
      // first
      this._prepareInsertDataByOptions(dataTemp, options);
      // then
      const [dataNew, dataNewOriginal] = await this.prepareData(table, dataTemp);
      datas.push(dataNew);
      datasOriginal.push(dataNewOriginal);
    }
    // builder
    const builder = this.builder<TRecord>(table);
    // insert
    builder.insert(datas as unknown as any);
    // debug
    this.$loggerChild('model').debug('model.insert: %s', builder.toQuery());
    // dialect insert
    const ids = await this.dialect.insert(builder);
    // combine
    const result: any[] = [];
    const dataDefault = await this.defaultData(table);
    for (let index = 0; index < ids.length; index++) {
      const dataWithId: any = {};
      if (ids[index] !== undefined) dataWithId.id = ids[index];
      // datasOriginal[index] maybe has id
      result.push(Object.assign({}, dataDefault, dataWithId, datasOriginal[index]));
    }
    // ok
    return Array.isArray(data) ? result : result[0];
  }

  async update(
    data?: Partial<TRecord>,
    options?: IModelUpdateOptionsGeneral<TRecord>,
  ): Promise<void> {
    return await this._update(undefined, data, options);
  }

  protected async _update(
    table?: keyof ITableRecord,
    data?: Partial<TRecord>,
    options?: IModelUpdateOptionsGeneral<TRecord>,
  ): Promise<void> {
    // table
    table = table || this.getTable('update', [table, data], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // data
    [data] = await this.prepareData(table, data);
    // where
    const where = Object.assign({}, options?.where);
    // id
    if (cast(data).id) {
      cast(where).id = cast(data).id;
      delete cast(data).id;
    }
    // disableUpdateTime
    if (!this._checkDisableUpdateTimeByOptions(options)) {
      cast(data).updatedAt = new Date();
    }
    // builder
    const builder = this.builder<TRecord>(table);
    // update
    builder.update(data as any);
    // where
    const wheres = this.prepareWhere(builder, table, where, options);
    if (wheres === false) {
      // do nothing
      return;
    }
    // debug
    this.$loggerChild('model').debug('model.update: %s', builder.toQuery());
    // ready
    await builder;
  }

  async delete(
    where?: TypeModelWhere<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<void> {
    return await this._delete(undefined, where, options);
  }

  protected async _delete(
    table?: keyof ITableRecord,
    where?: TypeModelWhere<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<void> {
    // table
    table = table || this.getTable('delete', [table, where], options);
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // disableDeleted
    if (!this._checkDisableDeletedByOptions(options)) {
      await this._update(table, { deleted: true } as any, Object.assign({}, options, { where }));
      return;
    }
    // builder
    const builder = this.builder<TRecord>(table);
    // delete
    builder.delete();
    // where
    const wheres = this.prepareWhere(builder, table, where, options);
    if (wheres === false) {
      // do nothing
      return;
    }
    // debug
    this.$loggerChild('model').debug('model.delete: %s', builder.toQuery());
    // ready
    await builder;
  }
}
