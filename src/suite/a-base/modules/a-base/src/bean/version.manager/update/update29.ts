import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aRoleFieldsRight
    await this.bean.model.createTable('aRoleFieldsRight', function (table) {
      table.basicFields();
      table.int0('roleId');
      table.int0('roleAtomId');
      table.int0('atomClassId');
      table.json('fieldsRight');
    });

    // aViewUserRightFields
    await this.bean.model.createView('aViewUserRightFields', view => {
      view.as(
        this.bean.model
          .builder('aViewUserRoleExpand as a')
          .select([
            'a.iid',
            'a.userId as userIdWho',
            'a.roleExpandId',
            'a.roleId',
            'a.roleIdBase',
            'b.id as roleFieldsRightId',
            'b.atomClassId',
            'b.fieldsRight',
          ])
          .innerJoin('aRoleFieldsRight as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });
  }
}
