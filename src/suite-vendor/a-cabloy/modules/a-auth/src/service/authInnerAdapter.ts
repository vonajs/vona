import type { IAuthBase, IAuthInnerAdapter } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceAuthInnerAdapter extends BeanBase implements IAuthInnerAdapter {
  get(auth: Partial<IAuthBase>): Promise<IAuthBase | undefined> {
    // todo: 从数据库读取数据
    return auth as any;
  }
}
