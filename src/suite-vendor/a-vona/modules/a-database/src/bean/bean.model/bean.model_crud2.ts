import type { IModelMethodOptions, IModelUpdateOptions, TableIdentity } from '../../types/index.ts';
import { cast } from 'vona';
import { BeanModelCrud } from './bean.model_crud.ts';

export class BeanModelCrud2<TRecord extends {}> extends BeanModelCrud<TRecord> {
  async create<TRecord2 extends {} = TRecord>(
    data?: Partial<TRecord2>,
    options?: IModelMethodOptions,
  ): Promise<TableIdentity>;
  async create<TRecord2 extends {} = TRecord>(
    table: string,
    data?: Partial<TRecord2>,
    options?: IModelMethodOptions,
  ): Promise<TableIdentity>;
  async create<TRecord2 extends {} = TRecord>(table?, data?, options?): Promise<TRecord2> {
    if (typeof table !== 'string') {
      options = data;
      data = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // data
    const data2 = await this.prepareData<TRecord2>(table, data);
    // insert
    const res = await this.insert(table, data2, options);
    cast(data2).id = res[0];
    return data2;
  }

  async write<TRecord2 extends {} = TRecord>(data?: Partial<TRecord2>, options?: IModelUpdateOptions): Promise<TRecord2>;
  async write<TRecord2 extends {} = TRecord>(
    table: string,
    data?: Partial<TRecord2>,
    options?: IModelUpdateOptions,
  ): Promise<TRecord2>;
  async write<TRecord2 extends {} = TRecord>(table?, data?, options?): Promise<TRecord2> {
    if (typeof table !== 'string') {
      options = data;
      data = table;
      table = undefined;
    }
    // table
    table = table || this.table;
    if (!table) return this.scopeDatabase.error.ShouldSpecifyTable.throw();
    // data
    const data2 = await this.prepareData<TRecord2>(table, data);
    // update
    await this.update(table, data2, options);
    return data2;
  }
}
