import type { IAuthBase, IAuthInnerAdapter } from '../types/auth.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuthInner extends BeanBase {
  private _authInnerAdapter: IAuthInnerAdapter;

  private get authInnerAdapter(): IAuthInnerAdapter {
    if (!this._authInnerAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.authInner, 'service');
      this._authInnerAdapter = this.bean._getBean<IAuthInnerAdapter>(beanFullName as never);
    }
    return this._authInnerAdapter;
  }

  async get(auth: Partial<IAuthBase>): Promise<IAuthBase | undefined> {
    if (String(auth.id).charAt(0) === '-') return auth as unknown as IAuthBase;
    return await this.authInnerAdapter.get(auth);
  }
}
