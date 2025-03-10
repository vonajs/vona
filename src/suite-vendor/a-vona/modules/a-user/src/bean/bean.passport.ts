import type { IJwtToken } from 'vona-module-a-jwt';
import type { IAuthIdRecord, ISigninOptions } from '../types/auth.ts';
import type { IPassportAdapter, IPassportBase } from '../types/passport.ts';
import type { IUserBase } from '../types/user.ts';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { getAuthIdSystem } from '../lib/auth.ts';

@Bean()
export class BeanPassport extends BeanBase {
  private _passportAdapter: IPassportAdapter;
  private _mockCounter: number = 0;

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

  public async setCurrent(passport: IPassportBase | undefined) {
    this.ctx.state.passport = await this.passportAdapter.setCurrent(passport);
  }

  public getCurrent<T extends IPassportBase = IPassportBase>(): T | undefined {
    return this.ctx.state.passport as T | undefined;
  }

  public getCurrentUser<T extends IUserBase = IUserBase>(): T | undefined {
    return this.ctx.state.passport?.user as T | undefined;
  }

  public async signin<T extends IPassportBase>(passport: T, options?: ISigninOptions): Promise<IJwtToken> {
    const authToken = options?.authToken ?? 'jwt';
    // current
    await this.setCurrent(passport);
    // event
    await this.scope.event.signin.emit(passport);
    // serializePassport: payloadData for client certificate
    const payloadData = await this.passportAdapter.serializePassport(passport);
    if (authToken !== 'jwt') throw new Error('Only support jwt');
    return await this.bean.jwt.create(payloadData);
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
    await this.setCurrent(undefined);
  }

  public async signinSystem<K extends keyof IAuthIdRecord>(
    authName: IAuthIdRecord[K],
    authId: K,
    name?: string,
    options?: ISigninOptions,
  ): Promise<IJwtToken> {
    const user = await this.passportAdapter.getUserMock(name);
    if (!user) return this.app.throw(401);
    const auth = { id: getAuthIdSystem(authName, authId) };
    const passport = { user, auth };
    return await this.signin(passport, options);
  }

  public async signinMock(name?: string, options?: ISigninOptions): Promise<IJwtToken> {
    return await this.signinSystem('mock', (-10000 - ++this._mockCounter) as any, name, options);
  }

  public async signinWithAnonymous(): Promise<void> {
    const userAnonymous = await this.createUserAnonymous();
    const passport = { user: userAnonymous, auth: undefined };
    await this.setCurrent(passport);
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
    const payloadData = await this.bean.jwt.get('access').verify();
    if (!payloadData) return; // no jwt token
    const passport = await this.passportAdapter.deserializePassport(payloadData);
    if (!passport) return this.app.throw(401);
    await this.setCurrent(passport);
  }

  public async refreshAuthToken(refreshToken: string) {
    let payloadData = await this.bean.jwt.get('refresh').verify(refreshToken);
    if (!payloadData) return this.app.throw(401);
    const configRefreshAuthToken = this.scope.config.passport.refreshAuthToken;
    if (configRefreshAuthToken.recreate) {
      await this.passportAdapter.removeAuthToken(payloadData);
      payloadData = await this.passportAdapter.createAuthToken(payloadData);
    } else if (configRefreshAuthToken.refresh) {
      await this.passportAdapter.refreshAuthToken(payloadData);
    }
    return await this.bean.jwt.create(payloadData);
  }
}
