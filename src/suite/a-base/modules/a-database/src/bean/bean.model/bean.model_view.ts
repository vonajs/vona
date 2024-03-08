import { Cast } from '@cabloy/core';
import { BeanModelKnex } from './bean.model_knex.js';
import { Knex } from 'knex';
import { ISwapDepsItem, swapDeps } from '@cabloy/deps';

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

  async viewDependentsAll(viewName: string): Promise<string[]> {
    // views
    const views: ISwapDepsItem[] = [{ name: viewName, dependencies: [] }];
    // dependencies all
    await this._viewDependentsAll_inner(viewName, views);
    // swap
    swapDeps(views);
    // shift
    views.shift();
    // ready
    return views.map(view => view.name);
  }

  private async _viewDependentsAll_inner(viewName: string, views: ISwapDepsItem[]) {
    const dependents = await this.viewDependents(viewName);
    for (const dependent of dependents) {
      // dependencies
      const view = views.find(view => view.name === dependent);
      if (view) {
        const dep = Cast(view.dependencies).find(dep => dep === viewName);
        if (!dep) {
          Cast(view.dependencies).push(viewName);
        }
      } else {
        views.push({ name: dependent, dependencies: [viewName] });
      }
      // next
      await this._viewDependentsAll_inner(dependent, views);
    }
  }
}
