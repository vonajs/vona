import type { TableIdentity } from 'table-identity';
import type { IRole, IRoleAdapter } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRoleAdapter extends BeanBase implements IRoleAdapter {
  async findOneByName(name: string): Promise<IRole | null> {
    return await this.scope.model.role.getByNameEqI(name);
  }

  async findOne(role: Partial<IRole>): Promise<IRole | null> {
    return await this.scope.model.role.get(role);
  }

  async findAllByUserId(userId: TableIdentity): Promise<IRole[] | undefined> {
    const user = await this.scope.model.user.get({ id: userId }, { include: { roles: true } });
    return user?.roles;
  }
}
