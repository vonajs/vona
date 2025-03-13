import type { IAuthBase, IAuthInnerAdapter } from 'vona-module-a-user';
import type { IAuth } from '../types/auth.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceAuthInnerAdapter extends BeanBase implements IAuthInnerAdapter {
  async get(auth: Partial<IAuth>): Promise<IAuthBase | undefined> {
    const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.authInner, 'service');
    const beanAuth = this.bean._getBean<IAuthInnerAdapter>(beanFullName as never);
    if (beanAuth) return await beanAuth.get(auth);
    return auth as unknown as IAuthBase | undefined;
  }
}
