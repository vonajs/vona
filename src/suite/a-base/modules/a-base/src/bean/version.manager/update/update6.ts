import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // aUser
    await this.bean.model.alterTable('aUser', function (table) {
      table.int0('activated');
      table.int0('emailConfirmed');
      table.int0('mobileVerified');
    });
  }
}
