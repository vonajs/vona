import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // create table: aAuthOpen
    await this.bean.model.createTable('aAuthOpen', function (table) {
      table.basicFields();
      table.atomId();
      table.description();
      table.userId();
      table.int0('scopeRoleId');
      table.int0('neverExpire');
      table.timestamp('expireTime');
      table.string('clientID', 50);
      table.text('clientSecret');
      table.int0('clientSecretHidden');
    });

    // view: aAuthOpenView
    await this.bean.model.createView('aAuthOpenView', view => {
      view.as(
        this.bean.model
          .builder('aAuthOpen as a')
          .select(['a.*', 'b.roleName as scopeRoleName'])
          .leftJoin('aRole as b', { 'a.scopeRoleId': 'b.id' }),
      );
    });
  }
}
