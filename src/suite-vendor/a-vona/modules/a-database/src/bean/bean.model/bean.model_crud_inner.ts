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
import { isNil } from '@cabloy/utils';
import { cast } from 'vona';
import { BeanModelView } from './bean.model_view.ts';

export class BeanModelCrudInner<TRecord extends {}> extends BeanModelView<TRecord> {
  protected async _mget(
    table?: keyof ITableRecord,
    ids?: TableIdentity[],
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<TRecord[]> {
    const items = await this._mget_original(table, ids, options);
    return items.filter(item => !isNil(item));
  }

  // with undefined
  protected async _mget_original(
    table?: keyof ITableRecord,
    ids?: TableIdentity[],
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<(TRecord | undefined)[]> {
    // table
    table = table || this.getTable();
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
      const item = items.find(item => cast(item).id === id);
      result.push(item);
    }
    return result;
  }

  protected async _select<T extends IModelSelectParams<TRecord>>(
    table?: keyof ITableRecord,
    params?: T,
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord[]> {
    // table
    table = table || this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // builder
    const builder = this._select_buildParams(table, params, options);
    // ready
    this.$loggerChild('model').debug('model.select: %s', builder.toQuery());
    return (await builder) as TRecord[];
  }

  protected _select_buildParams<T extends IModelSelectParams<TRecord>>(table: keyof ITableRecord, params?: T, options?: IModelMethodOptionsGeneral) {
    // params
    const params2 = params || {} as IModelSelectParams<TRecord>;
    // builder
    const builder = this.builder<TRecord, TRecord>(table);
    // columns
    builder.select(params2.columns as any);
    // distinct
    this.buildDistinct(builder, params2.distinct);
    // joins
    this.buildJoins(builder, params2.joins);
    // where
    this.prepareWhere(builder, table, params2.where, options);
    // orders
    this.buildOrders(builder, params2.orders);
    // limit
    this.buildLimit(builder, params2.limit);
    // offset
    this.buildOffset(builder, params2.offset);
    // ok
    return builder;
  }

  protected async _get(
    table: keyof ITableRecord | undefined,
    where: TypeModelWhere<TRecord>,
    options?: IModelGetOptionsGeneral<TRecord>,
  ): Promise<TRecord | undefined> {
    // table
    table = table || this.getTable();
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

  protected async _count(
    table?: keyof ITableRecord,
    params?: IModelCountParams<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<BigNumber> {
    // table
    table = table || this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // params
    params = params || {};
    // builder
    const builder = this.builder<TRecord>(table);
    // count
    this.buildCount(builder, params.column, params.distinct);
    // joins
    this.buildJoins(builder, params.joins);
    // where
    this.prepareWhere(builder, table, params.where, options);
    // ready
    this.$loggerChild('model').debug('model.count: %s', builder.toQuery());
    const res = await builder;
    return this.extractCount(res);
  }

  protected async _batchInsert(
    table?: keyof ITableRecord,
    data?: Partial<TRecord> | Partial<TRecord>[],
    options?: IModelMethodOptionsGeneral,
  ): Promise<TRecord | TRecord[]> {
    // table
    table = table || this.getTable();
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

  protected async _update(
    table: keyof ITableRecord | undefined,
    data: Partial<TRecord>,
    options?: IModelUpdateOptionsGeneral<TRecord>,
  ): Promise<void> {
    // table
    table = table || this.getTable();
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // data
    [data] = await this.prepareData(table, data);
    // where
    const where = Object.assign({}, options?.where);
    // id
    const columnId = `${table}.id`;
    for (const key of ['id', columnId]) {
      if (!isNil(data[key])) {
        cast(where).id = data[key];
        delete data[key];
      }
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
    this.prepareWhere(builder, table, where, options);
    // debug
    this.$loggerChild('model').debug('model.update: %s', builder.toQuery());
    // ready
    await builder;
  }

  protected async _delete(
    table?: keyof ITableRecord,
    where?: TypeModelWhere<TRecord>,
    options?: IModelMethodOptionsGeneral,
  ): Promise<void> {
    // table
    table = table || this.getTable();
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
    this.prepareWhere(builder, table, where, options);
    // debug
    this.$loggerChild('model').debug('model.delete: %s', builder.toQuery());
    // ready
    await builder;
  }
}
