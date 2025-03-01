import type { IPassportAdapter, IUserBase } from '../types/user.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { isAnonymous } from '../lib/user.ts';

@Bean()
export class BeanPassport extends BeanBase {
  private _passportAdapter: IPassportAdapter;

  private get passportAdapter(): IPassportAdapter {
    if (!this._passportAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.passportAdapter, 'service');
      this._passportAdapter = this.bean._getBean<IPassportAdapter>(beanFullName as never);
    }
    return this._passportAdapter;
  }

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
    const userAnonymous = await this.passportAdapter.createUserAnonymous();
    // event
    await this.scope.event.createUserAnonymous.emit(userAnonymous);
    // ok
    return userAnonymous as T;
  }

  public async signinMock<T extends IUserBase = IUserBase>(name?: string): Promise<T> {
    const user = await this.passportAdapter.getUserMock(name);
    if (!user) this.app.throw(403);
    await this.signin(user);
    return user as T;
  }
}
