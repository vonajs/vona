import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // create table: testPartyExpense
    await this.bean.model.createTable('testPartyExpense', function (table) {
      table.basicFields();
      table.atomIdMain();
      table.int0('detailLineNo');
      table.string('name', 50);
      table.int0('price');
      table.int0('quantity');
      table.int0('amount');
      table.string('remark', 255);
    });
  }
}
