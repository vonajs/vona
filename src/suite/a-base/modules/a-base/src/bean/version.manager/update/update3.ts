import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // aViewRoleRightAtomClassUser
    await this.bean.model.createView('aViewRoleRightAtomClassUser', view => {
      view.columns(['iid', 'roleIdWho', 'atomClassId', 'action', 'userIdWhom']);
      view.as(
        this.bean.model
          .builder('aRoleExpand as a')
          .select(['a.iid', 'a.roleId as roleIdWho', 'b.atomClassId', 'b.action', 'c.userId as userIdWhom'])
          .innerJoin('aRoleRightRef as b', { 'a.roleIdBase': 'b.roleId' })
          .innerJoin('aViewUserRoleRef as c', { 'b.roleIdScope': 'c.roleIdParent' }),
      );
    });

    // aViewRoleRightAtom
    await this.bean.model.createView('aViewRoleRightAtom', view => {
      view.columns(['iid', 'atomId', 'userIdWhom', 'roleIdWho', 'action']);
      view.as(
        this.bean.model
          .builder('aAtom as a')
          .select(['a.iid', 'a.id as atomId', 'a.userIdCreated as userIdWhom', 'b.roleIdWho', 'b.action'])
          .innerJoin('aViewRoleRightAtomClassUser as b', {
            'a.atomClassId': 'b.atomClassId',
            'a.userIdCreated': 'b.userIdWhom',
          })
          .where({
            'a.deleted': 0,
            'a.atomEnabled': 1,
          }),
      );
    });
  }
}
