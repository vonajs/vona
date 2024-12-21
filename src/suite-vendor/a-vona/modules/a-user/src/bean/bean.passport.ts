import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { IUserBase } from '../types/user.js';
import { isAnonymous } from '../lib/user.js';

@Bean()
export class BeanPassport extends BeanBase {
  public get isAuthenticated(): boolean {
    return !!this.current && !isAnonymous(this.current);
  }

  public get current(): IUserBase | undefined {
    return this.ctx.state.user;
  }
}
