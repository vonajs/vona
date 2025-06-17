import type { TableIdentity } from 'table-identity';
import type { IRoleBase, IRoleInnerAdapter } from 'vona-module-a-user';
import type { IRole } from '../types/role.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceRoleInnerAdapter extends BeanBase implements IRoleInnerAdapter {
  async findOneByName(name: string): Promise<IRoleBase | undefined> {
    return await this.findOne({ name });
  }

  async findOne(role: Partial<IRole>): Promise<IRoleBase | undefined> {
    return await this.scope.model.role.get(role);
  }

  async findAllByUserId(userId: TableIdentity): Promise<IRoleBase[]> {
    throw new Error('Method not implemented.');
  }
}
