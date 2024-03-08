import { Cast } from '@cabloy/core';
import { BeanModelKnex } from './bean.model_knex.js';
import { Knex } from 'knex';

export class BeanModelView<TRecord extends {}> extends BeanModelKnex<TRecord> {
  async createView(viewName: string, callback?: (viewBuilder: Knex.ViewBuilder) => any): Promise<void> {
    if (callback) {
      let _view: Knex.ViewBuilder | null = null;
      // create view
      await this.schema.createView(viewName, view => {
        callback(view);
        _view = view;
      });
      const sql = Cast(_view).toSQL();
      // record view
      await this.modelViewRecord.insert({ viewName, viewSql: sql[0].sql });
    } else {
      // get record
      const viewRecord = await this.modelViewRecord.get({ viewName });
      if (!viewRecord) throw new Error(`not found view record: ${viewName}`);
      await this.raw(viewRecord.viewSql);
    }
  }

  async dropView(viewName: string, removeRecord?: boolean) {
    // drop view
    await this.schema.dropView(viewName);
    // remove record
    if (removeRecord) {
      await this.modelViewRecord.delete({ viewName });
    }
  }
}
