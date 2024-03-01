import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aCache
      await this.bean.model.schema.createTable('aCache', function (table) {
        table.basicFields();
        table.string('module', 255);
        table.string('name', 255);
        table.json('value');
        table.integer('timeout').defaultTo(0);
      });
    }

    if (options.version === 2) {
      let sql;
      // delete
      sql = `
          delete from aCache
        `;
      await this.ctx.model.query(sql);
      // alter table: aCache
      sql = `
          ALTER TABLE aCache
            DROP COLUMN timeout,
            ADD COLUMN expired timestamp DEFAULT NULL
        `;
      await this.ctx.model.query(sql);
    }
  }

  async init(options) {
    if (options.version === 0) {
      // cache reset
      //   : just clear mem cache
      await this.ctx.cache.mem._clearAll();
    }
  }
}
