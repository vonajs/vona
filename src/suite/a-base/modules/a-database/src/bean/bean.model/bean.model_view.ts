import { Cast } from '@cabloy/core';
import { BeanModelKnex } from './bean.model_knex.js';
import { Knex } from 'knex';

export class BeanModelView<TRecord extends {}> extends BeanModelKnex<TRecord> {
  async createView(viewName: string, callback?: (viewBuilder: Knex.ViewBuilder) => any): Promise<void> {
    if (callback) {
      // create view
      let _view: Knex.ViewBuilder | null = null;
      await this.schema.createView(viewName, view => {
        callback(view);
        _view = view;
      });
      // view sql
      const sql = Cast(_view).toSQL();
      const viewSql = sql[0].sql;
      // record view
      const viewRecord = await this.modelViewRecord.get({ viewName });
      if (viewRecord) {
        await this.modelViewRecord.update({ id: viewRecord.id, viewSql });
      } else {
        await this.modelViewRecord.insert({ viewName, viewSql });
      }
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

  async alterView(viewName: string, callback?: (viewBuilder: Knex.ViewBuilder) => any): Promise<void> {
    // drop view
    await this.dropView(viewName, false);
    // create view
    await this.createView(viewName, callback);
  }

  async viewDependents(viewName: string): Promise<string[]> {
    // builder
    const builder = this.builder();
    // dialect
    return await this.dialect.viewDependents(builder, viewName);
  }
}
