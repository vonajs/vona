import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // alter table: testParty
    await this.bean.model.alterTable('testParty', function (table) {
      table.int0('partyExpenseCount');
      table.int0('partyExpenseAmount');
      table.text('partySummary');
      table.int0('partyOverPerson');
      table.timestamp('partyOverTime');
    });
  }
}
