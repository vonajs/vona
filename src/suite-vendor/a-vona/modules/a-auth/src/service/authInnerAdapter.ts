import type { IAuthBase, IAuthInnerAdapter } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceAuthInnerAdapter extends BeanBase implements IAuthInnerAdapter {
  async findOne(auth: Partial<IAuthBase>): Promise<IAuthBase | undefined> {
    return await this.scope.model.auth.get(auth);
  }
}
