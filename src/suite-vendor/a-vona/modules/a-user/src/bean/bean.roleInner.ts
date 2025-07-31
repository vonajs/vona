import type { TableIdentity } from 'vona-module-a-orm';
import type { IRoleBase, IRoleInnerAdapter } from '../types/role.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanRoleInner extends BeanBase {
  private _roleInnerAdapter: IRoleInnerAdapter;

  private get roleInnerAdapter(): IRoleInnerAdapter {
    if (!this._roleInnerAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.roleInner, 'service');
      this._roleInnerAdapter = this.bean._getBean<IRoleInnerAdapter>(beanFullName as never);
    }
    return this._roleInnerAdapter;
  }

  findOneByName(name: string): Promise<IRoleBase | undefined> {
    return this.roleInnerAdapter.findOneByName(name);
  }

  findOne(role: Partial<IRoleBase>): Promise<IRoleBase | undefined> {
    return this.roleInnerAdapter.findOne(role);
  }

  findAllByUserId(userId: TableIdentity): Promise<IRoleBase[] | undefined> {
    return this.roleInnerAdapter.findAllByUserId(userId);
  }
}
