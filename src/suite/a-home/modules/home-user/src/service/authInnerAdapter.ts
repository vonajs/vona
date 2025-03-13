import type { IAuthBase, IAuthInnerAdapter } from 'vona-module-a-user';
import type { IAuth } from '../types/auth.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceAuthInnerAdapter extends BeanBase implements IAuthInnerAdapter {
  async get(auth: Partial<IAuth>): Promise<IAuthBase | undefined> {
    const beanAuth = this.bean._getBean(this.scope.config.adapter.auth as any);
    if (beanAuth) return await beanAuth.get(auth);
    return auth as unknown as IAuthBase | undefined;
  }
}
