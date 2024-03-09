import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aDict: add dictMode
    await this.bean.model.alterTable('aDict', function (table) {
      table.int0('dictMode');
    });

    // alter view: aDictViewFull
    await this.bean.model.alterView('aDictViewFull', view => {
      view.as(
        this.bean.model
          .builder('aDict as a')
          .select(['a.*', 'b.dictItems', 'b.dictLocales'])
          .leftJoin('aDictContent as b', { 'a.id': 'b.itemId' }),
      );
    });
  }
}
