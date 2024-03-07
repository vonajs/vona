import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aAtom: atomIdArchive -> atomIdFormal
    await this.bean.model.schema.alterTable('aAtom', function (table) {
      table.renameColumn('atomIdArchive', 'atomIdFormal');
    });
  }
}
