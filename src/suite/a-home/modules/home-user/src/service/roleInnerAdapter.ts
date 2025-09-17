import type { TableIdentity } from 'table-identity';
import type { IRoleBase, IRoleInnerAdapter } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRoleInnerAdapter extends BeanBase implements IRoleInnerAdapter {
  async findOneByName(name: string): Promise<IRoleBase | undefined> {
    return await this.scope.model.role.get({ name: { _eqI_: name } });
  }

  async findOne(role: Partial<IRoleBase>): Promise<IRoleBase | undefined> {
    return await this.scope.model.role.get(role);
  }

  async findAllByUserId(userId: TableIdentity): Promise<IRoleBase[] | undefined> {
    const user = await this.scope.model.user.get({ id: userId }, { include: { roles: true } });
    return user?.roles;
  }
}
