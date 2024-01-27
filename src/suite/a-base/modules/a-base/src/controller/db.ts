import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleABase } from '../index.js';

@Controller()
export class ControllerDb extends BeanBase {
  @Use()
  scope: ScopeModuleABase;

  async insert() {
    const { tableName, data } = this.ctx.request.body;
    const res = await this.scope.local.db.insert({
      tableName,
      data,
    });
    this.ctx.success(res);
  }

  async select() {
    const { tableName, options } = this.ctx.request.body;
    const res = await this.scope.local.db.select({
      tableName,
      options,
    });
    this.ctx.success(res);
  }

  async get() {
    const { tableName, where } = this.ctx.request.body;
    const res = await this.scope.local.db.get({
      tableName,
      where,
    });
    this.ctx.success(res);
  }

  async count() {
    const { tableName, where } = this.ctx.request.body;
    const res = await this.scope.local.db.count({
      tableName,
      where,
    });
    this.ctx.success(res);
  }

  async update() {
    const { tableName, data, options } = this.ctx.request.body;
    const res = await this.scope.local.db.update({
      tableName,
      data,
      options,
    });
    this.ctx.success(res);
  }

  async delete() {
    const { tableName, where } = this.ctx.request.body;
    const res = await this.scope.local.db.delete({
      tableName,
      where,
    });
    this.ctx.success(res);
  }

  async query() {
    const { sql, params } = this.ctx.request.body;
    const res = await this.scope.local.db.query({
      sql,
      params,
    });
    this.ctx.success(res);
  }

  async queryOne() {
    const { sql, params } = this.ctx.request.body;
    const res = await this.scope.local.db.queryOne({
      sql,
      params,
    });
    this.ctx.success(res);
  }

  async iid() {
    const res = await this.scope.local.db.iid();
    this.ctx.success(res);
  }
}
