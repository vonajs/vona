import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run(options) {
    // aRoleFieldsRight
    let sql = `
        CREATE TABLE aRoleFieldsRight (
          id int(11) NOT NULL AUTO_INCREMENT,
          createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          deleted int(11) DEFAULT '0',
          iid int(11) DEFAULT '0',
          roleId int(11) DEFAULT '0',
          roleAtomId int(11) DEFAULT '0',
          atomClassId int(11) DEFAULT '0',
          fieldsRight JSON DEFAULT NULL,
          PRIMARY KEY (id)
        ) 
      `;
    await this.ctx.model.query(sql);

    // aViewUserRightFields
    sql = `
        create view aViewUserRightFields as
          select a.iid,a.userId as userIdWho,a.roleExpandId,a.roleId,a.roleIdBase,
                 b.id as roleFieldsRightId,b.atomClassId,b.fieldsRight
            from aViewUserRoleExpand a
              inner join aRoleFieldsRight b on a.roleIdBase=b.roleId
      `;
    await this.ctx.model.query(sql);
  }
}
