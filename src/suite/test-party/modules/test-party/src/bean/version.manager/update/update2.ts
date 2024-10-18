import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    await this.bean.model.alterTable('testParty', function (table) {
      table.timestamp('partyTime');
      table.string('partyCountry', 50);
      table.string('partyCity', 50);
    });
  }
}
