import type { IUserBase } from 'vona-module-a-user';
import { BeanBase, uuidv4 } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceMail extends BeanBase {
  async emailConfirm(user: IUserBase) {
    // link
    const token = uuidv4();
  }
}
