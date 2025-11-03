import type { TableIdentity } from 'table-identity';
import type { IRoleAdapter, IRole } from '../types/role.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanRole extends BeanBase {
  private _roleAdapter: IRoleAdapter;

  private get roleAdapter(): IRoleAdapter {
    if (!this._roleAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.role, 'service');
      this._roleAdapter = this.bean._getBean(beanFullName) as IRoleAdapter;
    }
    return this._roleAdapter;
  }

  findOneByName(name: string): Promise<IRole | undefined> {
    return this.roleAdapter.findOneByName(name);
  }

  findOneById(id: TableIdentity): Promise<IRole | undefined> {
    return this.roleAdapter.findOne({ id });
  }

  findOne(role: Partial<IRole>): Promise<IRole | undefined> {
    return this.roleAdapter.findOne(role);
  }

  findAllByUserId(userId: TableIdentity): Promise<IRole[] | undefined> {
    return this.roleAdapter.findAllByUserId(userId);
  }
}
