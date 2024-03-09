import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aAtom: drop atomId
    await this.bean.model.alterTable('aUserOnlineHistory', function (table) {
      table.dropColumn('atomId');
    });
  }
}
