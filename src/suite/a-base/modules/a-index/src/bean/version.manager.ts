import { Bean, BeanBase } from '@cabloy/core';

import chalk from 'chalk';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(_options) {
    // check indexes
    if (this.ctx.config.indexesCheck) {
      // combine module's indexes
      const moduleIndexes: any = {};
      for (const relativeName in this.app.meta.modules) {
        const module = this.app.meta.modules[relativeName];
        if (module.meta && module.meta.index && module.meta.index.indexes) {
          moduleIndexes[relativeName] = module.meta.index.indexes;
        }
      }
      // combine indexes all
      const indexes = this.ctx.bean.util.extend(
        {},
        this.ctx.config.indexes,
        moduleIndexes,
        this.ctx.config.indexesExtend,
      );
      // create indexes
      for (const moduleRelativeName in indexes) {
        if (this.app.meta.modules[moduleRelativeName]) {
          const moduleIndexes = indexes[moduleRelativeName];
          for (const tableName in moduleIndexes) {
            await this._createIndexesOnTable({ tableName, indexes: moduleIndexes[tableName] });
          }
        }
      }
    }
  }

  async init(_options) {}

  async test() {}

  async _createIndexesOnTable({ tableName, indexes }: any) {
    const indexPrefix = `idx_${tableName}_`;
    try {
      const _indexArray = indexes.split(',');
      const list = await this.bean.model.schema.fetchIndexes(tableName);
      const map: Record<string, boolean> = {};
      for (const item of list) {
        const indexName = item.indexName;
        const columnName = indexName.substring(indexPrefix.length);
        map[columnName] = true;
      }
      for (const _index of _indexArray) {
        const _arr = _index.split(':');
        const fieldNames = _arr[0];
        const fieldNameArray = fieldNames.split('+');
        const fieldNameFirst = fieldNameArray[0];
        const indexType = _arr[1] || undefined;
        if (!map[fieldNameFirst]) {
          const indexName = `${indexPrefix}${fieldNameFirst}`;
          await this.bean.model.schema.alterTable(tableName, function (table) {
            table.index(fieldNameArray, indexName, indexType);
          });
          // too long
          // const sql = `create ${indexType} index idx_${tableName}_${fieldNameArray.join('_')} ON ${tableName} (${fieldNameArray.join(',')})`;
        }
      }
    } catch (e: any) {
      // just log the error message
      console.log(chalk.red(e.message));
      if (e.sql) console.log(chalk.red(e.sql));
    }
  }
}
