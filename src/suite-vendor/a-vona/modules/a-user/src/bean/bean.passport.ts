import type { IAuthIdRecord } from '../types/auth.ts';
import type { IPassportAdapter, IPassportBase, IPayloadDataBase, IUserBase } from '../types/user.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';
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
    const passport = this.getCurrent();
    return !!passport && !!passport.auth;
  }

  public setCurrent<T extends IPassportBase>(passport: T | undefined) {
    this.ctx.state.passport = passport;
  }

  public getCurrent<T extends IPassportBase = IPassportBase>(): T | undefined {
    return this.ctx.state.passport as T | undefined;
  }

  public getCurrentUser<T extends IUserBase = IUserBase>(): T | undefined {
    return this.ctx.state.passport?.user as T | undefined;
  }

  public async signin<T extends IPassportBase>(passport: T): Promise<IPayloadDataBase> {
    // current
    this.setCurrent(passport);
    // event
    await this.scope.event.signin.emit(passport);
    // serializePassport: payloadData for client certificate
    return await this.passportAdapter.serializePassport(passport);
  }

  public async signout(): Promise<void> {
    // current
    const passport = this.getCurrent();
    if (!passport) return;
    // removePassport
    await this.passportAdapter.removePassport(passport);
    // event
    await this.scope.event.signout.emit(passport);
    // ok
    this.setCurrent(undefined);
  }

  public async signinSystem<K extends keyof IAuthIdRecord>(authName: IAuthIdRecord[K], authId: K, name?: string): Promise<IPayloadDataBase> {
    const user = await this.passportAdapter.getUserMock(name);
    if (!user) return this.app.throw(401);
    const auth = { id: getAuthIdSystem(authName, authId) };
    const passport = { user, auth };
    return await this.signin(passport);
  }

  public async signinMock(name?: string): Promise<IPayloadDataBase> {
    return await this.signinSystem('mock', '-1', name);
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

  /** default is jwt */
  public async checkAuthToken() {
    const payload = await this.bean.jwt.get('access').verify();
    if (!payload) return; // no jwt token
    const data = payload[this.$scope.jwt.config.field.payload.data];
    const passport = await this.passportAdapter.deserializePassport(data);
    if (!passport) return this.app.throw(401);
    this.setCurrent(passport);
  }
}
