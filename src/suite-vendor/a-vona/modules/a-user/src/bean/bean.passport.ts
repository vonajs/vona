import type { IPassportAdapter, IPassportBase, IPayloadDataBase, IUserBase } from '../types/user.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { isAnonymous } from '../lib/user.ts';
import { getAuthIdSystem } from '../types/auth.ts';

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
    const user = this.getCurrentUser();
    return !!user && !isAnonymous(user);
  }

  public setCurrent<T extends IPassportBase>(passport: T | undefined) {
    this.ctx.state.passport = passport;
    let ctxCaller = this.ctx.ctxCaller;
    while (ctxCaller) {
      ctxCaller.state.passport = passport;
      ctxCaller = ctxCaller.ctxCaller;
    }
  }

  public getCurrent<T extends IPassportBase = IPassportBase>(): T | undefined {
    return this.ctx.state.passport as T | undefined;
  }

  public getCurrentUser<T extends IUserBase = IUserBase>(): T | undefined {
    return this.ctx.state.passport?.user as T | undefined;
  }

  public async signin<T extends IPassportBase>(passport: T): Promise<IPayloadDataBase> {
    // event
    await this.scope.event.signin.emit(passport);
    // current
    this.setCurrent(passport);
    // serializePassport: payloadData for client certificate
    const payloadData = await this.passportAdapter.serializePassport(passport);
    return payloadData;
  }

  public async signout(): Promise<void> {
    const passport = this.getCurrent();
    if (!passport) return;
    // event
    await this.scope.event.signout.emit(passport);
    // ok
    this.setCurrent(undefined);
  }

  public async signinWithAnonymous(): Promise<void> {
    const userAnonymous = await this.createUserAnonymous();
    const passport = { user: userAnonymous, auth: undefined };
    this.setCurrent(passport);
  }

  public async createUserAnonymous<T extends IUserBase = IUserBase>(): Promise<T> {
    const userAnonymous = await this.passportAdapter.createUserAnonymous();
    // event
    await this.scope.event.createUserAnonymous.emit(userAnonymous);
    // ok
    return userAnonymous as T;
  }

  public async signinMock<T extends IPassportBase = IPassportBase>(name?: string): Promise<T> {
    const user = await this.passportAdapter.getUserMock(name);
    if (!user) return this.app.throw(401);
    const auth = { id: getAuthIdSystem('mock', '-1') };
    const passport = { user, auth };
    await this.signin(passport);
    return passport as unknown as T;
  }

  /** default is jwt */
  public async checkAuthToken() {
    const payload = await this.bean.jwt.get('access').verify();
    const data = payload[this.$scope.jwt.config.field.payload.data];
    const passport = await this.passportAdapter.deserializePassport(data);
    if (!passport) return this.app.throw(401);
    this.setCurrent(passport);
  }
}
