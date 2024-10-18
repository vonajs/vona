import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // aAtomClass: drop atomClassIdParent
    await this.bean.model.alterTable('aAtomClass', function (table) {
      table.dropColumn('atomClassIdParent');
    });
  }
}
