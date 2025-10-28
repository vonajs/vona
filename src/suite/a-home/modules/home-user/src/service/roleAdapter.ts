import type { TableIdentity } from 'table-identity';
import type { IRoleAdapter } from 'vona-module-a-user';
import type { EntityRole } from 'vona-module-test-vona';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRoleAdapter extends BeanBase implements IRoleAdapter {
  async findOneByName(name: string): Promise<EntityRole | undefined> {
    return await this.scope.model.role.getByNameEqI(name);
  }

  async findOne(role: Partial<EntityRole>): Promise<EntityRole | undefined> {
    return await this.scope.model.role.get(role);
  }

  async findAllByUserId(userId: TableIdentity): Promise<EntityRole[] | undefined> {
    const user = await this.scope.model.user.get({ id: userId }, { include: { roles: true } });
    return user?.roles;
  }
}
