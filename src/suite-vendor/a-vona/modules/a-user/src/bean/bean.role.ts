import type { TableIdentity } from 'table-identity';
import type { IRoleAdapter, IRoleBase } from '../types/role.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanRole extends BeanBase {
  private _roleAdapter: IRoleAdapter;

  private get roleAdapter(): IRoleAdapter {
    if (!this._roleAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.role, 'service');
      this._roleAdapter = this.bean._getBean<IRoleAdapter>(beanFullName as never);
    }
    return this._roleAdapter;
  }

  findOneByName(name: string): Promise<IRoleBase | undefined> {
    return this.roleAdapter.findOneByName(name);
  }

  findOne(role: Partial<IRoleBase>): Promise<IRoleBase | undefined> {
    return this.roleAdapter.findOne(role);
  }

  findAllByUserId(userId: TableIdentity): Promise<IRoleBase[] | undefined> {
    return this.roleAdapter.findAllByUserId(userId);
  }
}
