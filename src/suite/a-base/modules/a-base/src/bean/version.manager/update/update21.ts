import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    await this._alterTables();
  }

  async _alterTables() {
    // aAtom: add atomState, default value is null
    await this.bean.model.alterTable('aAtom', function (table) {
      table.string('atomState', 255);
    });
    // aAtomAction: for workflow
    //   actionMode: 0/default 1/workflow
    await this.bean.model.alterTable('aAtomAction', function (table) {
      table.int0('actionMode');
      table.string('flowKey', 50);
      table.string('nodeDefId', 50);
    });
  }
}
