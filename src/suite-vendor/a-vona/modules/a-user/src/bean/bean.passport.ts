import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { IPassportAdapter, IUserBase } from '../types/user.js';
import { isAnonymous } from '../lib/user.js';

@Bean()
export class BeanPassport extends BeanBase {
  public get isAuthenticated(): boolean {
    return !!this.current && !isAnonymous(this.current);
  }

  public get current(): IUserBase | undefined {
    return this.ctx.state.user;
  }

  public set current(user: IUserBase | undefined) {
    this.ctx.state.user = user;
  }

  public async signinWithAnonymous(): Promise<void> {
    const serviceAdapter = this.bean._getBean<IPassportAdapter>(this.scope.config.passportAdapter as never);
    const userAnonymous = await serviceAdapter.createUserAnonymous();
    this.current = userAnonymous;
  }
}
