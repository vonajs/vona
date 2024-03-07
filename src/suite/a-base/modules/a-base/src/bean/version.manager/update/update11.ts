import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aAtom: add atomSimple
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.int0('atomSimple');
    });
  }
}
