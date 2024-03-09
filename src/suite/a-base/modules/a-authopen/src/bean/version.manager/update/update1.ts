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
    sql = `
          CREATE VIEW aAuthOpenView as
            select a.*,b.roleName as scopeRoleName from aAuthOpen a
              left join aRole b on a.scopeRoleId=b.id
        `;
    await this.ctx.model.query(sql);
  }
}
