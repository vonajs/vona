import { Knex } from 'knex';
import { IModelMethodOptions } from '../../types.js';
import { BeanModelCrud } from './bean.model_crud.js';

export class BeanModelCrud2<TRecord extends {}> extends BeanModelCrud<TRecord> {
  async create<TRecord2 extends {} = TRecord>(data?: Partial<TRecord2>, options?: IModelMethodOptions): Promise<number>;
  async create<TRecord2 extends {} = TRecord>(
    table: Knex.TableDescriptor | Knex.AliasDict,
    data?: Partial<TRecord2>,
    options?: IModelMethodOptions,
  ): Promise<number>;
  async create(table?, data?, options?): Promise<number> {
    if (typeof table !== 'string') {
      table = undefined;
      options = data;
      data = table;
    }
    // table
    table = table || this.table;
    if (!table) throw new Error('should specify the table name');
    // data
    const data2 = await this.prepareData(data);
    const res = await this.insert(table, data2, options);
    return res[0];
  }
}
