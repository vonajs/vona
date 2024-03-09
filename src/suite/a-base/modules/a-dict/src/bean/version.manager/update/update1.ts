import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // create table: aDict
    await this.bean.model.createTable('aDict', function (table) {
      table.basicFields();
      table.atomId();
      table.description();
    });

    // create table: aDictContent
    await this.bean.model.createTable('aDictContent', function (table) {
      table.basicFields();
      table.atomId();
      table.itemId();
      table.json('dictItems');
      table.json('dictLocales');
    });

    // create view: aDictViewFull
    await this.bean.model.createView('aDictViewFull', view => {
      view.as(
        this.bean.model
          .builder('aDict as a')
          .select(['a.*', 'b.dictItems', 'b.dictLocales'])
          .leftJoin('aDictContent as b', { 'a.id': 'b.itemId' }),
      );
    });
  }
}
