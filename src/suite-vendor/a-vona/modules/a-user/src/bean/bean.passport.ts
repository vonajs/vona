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
    let ctxCaller = this.ctx.ctxCaller;
    while (ctxCaller) {
      ctxCaller.state.user = user;
      ctxCaller = ctxCaller.ctxCaller;
    }
  }

  public async signin(user: IUserBase): Promise<void> {
    // event
    await this.scope.event.signin.emit(user);
    // ok
    this.current = user;
  }

  public async signout(): Promise<void> {
    if (!this.current) return;
    // event
    await this.scope.event.signout.emit(this.current);
    // ok
    this.current = undefined;
  }

  public async signinWithAnonymous(): Promise<void> {
    const userAnonymous = await this.createUserAnonymous();
    this.current = userAnonymous;
  }

  public async createUserAnonymous(): Promise<IUserBase> {
    const serviceAdapter = this.bean._getBean<IPassportAdapter>(this.scope.config.passportAdapter as never);
    const userAnonymous = await serviceAdapter.createUserAnonymous();
    // event
    await this.scope.event.createUserAnonymous.emit(userAnonymous);
    // ok
    return userAnonymous;
  }
}
