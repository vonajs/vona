import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalDb extends BeanBase {
  async insert({ tableName, data }: any) {
    return await this.ctx.db.insert(tableName, data);
  }

  async select({ tableName, options }: any) {
    return await this.ctx.db.select(tableName, options);
  }

  async get({ tableName, where }: any) {
    return await this.ctx.db.get(tableName, where);
  }

  async count({ tableName, where }: any) {
    return await this.ctx.db.count(tableName, where);
  }

  async update({ tableName, data, options }: any) {
    return await this.ctx.db.update(tableName, data, options);
  }

  async delete({ tableName, where }: any) {
    return await this.ctx.db.delete(tableName, where);
  }

  async query({ sql, params }: any) {
    return await this.ctx.db.query(sql, params);
  }

  async queryOne({ sql, params }: any) {
    return await this.ctx.db.queryOne(sql, params);
  }

  async iid() {
    return this.ctx.instance.id;
  }
}
