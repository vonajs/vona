import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceUser extends BeanBase {
  async relationBelongsToMany() {
    // insert: roles
    const roles = await this.scope.model.role.insertBulk([
      { name: 'role-family' },
      { name: 'role-friend' },
    ]);
    const roleIdFamily = roles[0].id;
    const roleIdFriend = roles[1].id;
    // insert: user
    const userCreate = await this.scope.model.user.insert(
      {
        name: 'Tom',
        roles: [{
          id: roleIdFamily,
        }],
      },
      {
        include: {
          roles: true,
        },
      },
    );
    // get: user
    await this.scope.model.user.get(
      {
        id: userCreate.id,
      },
      {
        include: {
          roles: true,
        },
      },
    );
    // update: user
    await this.scope.model.user.update(
      {
        id: userCreate.id,
        roles: [
          // delete
          { id: roleIdFamily, deleted: true },
          // insert
          { id: roleIdFriend },
        ],
      },
      {
        include: {
          roles: true,
        },
      },
    );
    // delete: user
    await this.scope.model.user.delete(
      {
        id: userCreate.id,
      },
      {
        include: {
          roles: true,
        },
      },
    );
  }
}
