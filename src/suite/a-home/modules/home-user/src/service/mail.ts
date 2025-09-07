import type { IUser } from '../types/user.ts';
import { BeanBase, uuidv4 } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceMail extends BeanBase {
  async emailConfirm(user: IUser) {
    // link
    const token = uuidv4();
  }
}
