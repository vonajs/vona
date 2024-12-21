import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { IPassportAdapter, IUserBase } from '../types/user.js';
import { isAnonymous } from '../lib/user.js';

@Bean()
export class BeanPassport extends BeanBase {
  public get isAuthenticated(): boolean {
    const user = this.getCurrent();
    return !!user && !isAnonymous(user);
  }

  public getCurrent<T extends IUserBase = IUserBase>(): T | undefined {
    return this.ctx.state.user as T | undefined;
  }

  public setCurrent<T extends IUserBase>(user: T | undefined) {
    this.ctx.state.user = user;
    let ctxCaller = this.ctx.ctxCaller;
    while (ctxCaller) {
      ctxCaller.state.user = user;
      ctxCaller = ctxCaller.ctxCaller;
    }
  }

  public async signin<T extends IUserBase>(user: T): Promise<void> {
    // event
    await this.scope.event.signin.emit(user);
    // ok
    this.setCurrent(user);
  }

  public async signout(): Promise<void> {
    const user = this.getCurrent();
    if (!user) return;
    // event
    await this.scope.event.signout.emit(user);
    // ok
    this.setCurrent(undefined);
  }

  public async signinWithAnonymous(): Promise<void> {
    const userAnonymous = await this.createUserAnonymous();
    this.setCurrent(userAnonymous);
  }

  public async createUserAnonymous<T extends IUserBase = IUserBase>(): Promise<T> {
    const serviceAdapter = this.bean._getBean<IPassportAdapter>(this.scope.config.passportAdapter as never);
    const userAnonymous = await serviceAdapter.createUserAnonymous();
    // event
    await this.scope.event.createUserAnonymous.emit(userAnonymous);
    // ok
    return userAnonymous as T;
  }
}
