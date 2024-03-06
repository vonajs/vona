import { IModelMethodOptions, IModelUpdateOptions } from '../../types.js';
import { BeanModelCrud } from './bean.model_crud.js';

export class BeanModelCrud2<TRecord extends {}> extends BeanModelCrud<TRecord> {
  async create<TRecord2 extends {} = TRecord>(
    data?: Partial<TRecord2>,
    options?: IModelMethodOptions,
  ): Promise<number> {
    // table
    const table = this.table;
    if (!table) throw new Error('should specify the table name');
    // data
    const data2 = await this.prepareData(data);
    // insert
    const res = await this.insert(table, data2, options);
    return res[0];
  }

  async write<TRecord2 extends {} = TRecord>(data?: Partial<TRecord2>, options?: IModelUpdateOptions): Promise<void> {
    // table
    const table = this.table;
    if (!table) throw new Error('should specify the table name');
    // data
    const data2 = await this.prepareData(data);
    // update
    await this.update(table, data2, options);
  }
}
