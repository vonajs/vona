import type { IJwtClientRecord, IJwtSignOptions, IJwtToken, IJwtVerifyOptions, IPayloadDataBase } from 'vona-module-a-jwt';
import type { IAuthBase, IAuthIdRecord, ISigninOptions } from '../types/auth.ts';
import type { IAuthTokenAdapter } from '../types/authToken.ts';
import type { IPassportAdapter, IPassportBase } from '../types/passport.ts';
import type { IRoleBase } from '../types/role.ts';
import type { IUserBase, IUserNameRecord } from '../types/user.ts';
import { catchError } from '@cabloy/utils';
import { BeanBase, beanFullNameFromOnionName } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { $getAuthIdSystem } from '../lib/auth.ts';

@Bean()
export class BeanPassport extends BeanBase {
  private _authTokenAdapter: IAuthTokenAdapter;
  private _passportAdapter: IPassportAdapter;
  private _mockCounter: number = 0;

  private get authTokenAdapter(): IAuthTokenAdapter {
    if (!this._authTokenAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.authToken, 'service');
      this._authTokenAdapter = this.bean._getBean<IAuthTokenAdapter>(beanFullName as never);
    }
    return this._authTokenAdapter;
  }

  private get passportAdapter(): IPassportAdapter {
    if (!this._passportAdapter) {
      const beanFullName = beanFullNameFromOnionName(this.scope.config.adapter.passport, 'service');
      this._passportAdapter = this.bean._getBean<IPassportAdapter>(beanFullName as never);
    }
    return this._passportAdapter;
  }

  public get isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return !!user && !user.anonymous;
  }

  public get isActivated(): boolean {
    const user = this.getCurrentUser();
    return !!user && !!user.activated;
  }

  public async isAdmin(): Promise<boolean> {
    const passport = this.getCurrent();
    return await this.passportAdapter.isAdmin(passport);
  }

  public async setCurrent(passport: IPassportBase | undefined) {
    this.ctx.state.passport = await this.passportAdapter.setCurrent(passport);
  }

  public getCurrent(): IPassportBase | undefined {
    return this.ctx.state.passport;
  }

  public getCurrentUser(): IUserBase | undefined {
    return this.ctx.state.passport?.user;
  }

  public getCurrentAuth(): IAuthBase | undefined {
    return this.ctx.state.passport?.auth;
  }

  public getCurrentRoles(): IRoleBase[] | undefined {
    return this.ctx.state.passport?.roles;
  }

  public async signin(passport: IPassportBase, options?: ISigninOptions): Promise<IJwtToken> {
    // current
    await this.setCurrent(passport);
    // event
    await this.scope.event.signin.emit(passport);
    // serialize: payloadData for client certificate
    const payloadData = await this._passportSerialize(passport, options);
    // jwt token
    return await this.bean.jwt.create(payloadData, { dev: passport.auth?.id.toString() === '-1' });
  }

  public async signout(): Promise<void> {
    // current
    const passport = this.getCurrent();
    if (!passport) return;
    // removeAuthToken
    const payloadData = await this.passportAdapter.serialize(passport);
    await this.authTokenAdapter.remove(payloadData);
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
    const user = await this.bean.user.findOneByName(name ?? 'admin');
    if (!user) return this.app.throw(401);
    const auth = { id: $getAuthIdSystem(authName, authId) };
    const passport = { user, auth };
    return await this.signin(passport, options);
  }

  public async signinMock(name?: keyof IUserNameRecord, options?: ISigninOptions): Promise<IJwtToken> {
    return await this.signinSystem('mock', (-10000 - ++this._mockCounter) as any, name, options);
  }

  public async signinWithAnonymous(): Promise<void> {
    const userAnonymous = await this.createUserAnonymous();
    const passport = { user: userAnonymous, auth: undefined };
    await this.setCurrent(passport);
  }

  public async createUserAnonymous(): Promise<IUserBase> {
    const userAnonymous = await this.bean.user.createAnonymous();
    // event
    await this.scope.event.createUserAnonymous.emit(userAnonymous);
    // ok
    return userAnonymous;
  }

  public async kickOut(user: IUserBase) {
    await this.authTokenAdapter.removeAll(user);
  }

  public async checkAuthToken(accessToken?: string, clientName?: keyof IJwtClientRecord, options?: IJwtVerifyOptions) {
    clientName = clientName ?? 'access';
    const [payloadData, err] = await catchError(() => {
      return this.bean.jwt.get(clientName).verify(accessToken, options);
    });
    if (err) {
      if (['access', 'refresh'].includes(clientName)) {
        err.code = 401;
      }
      throw err;
    }
    if (!payloadData) return; // no jwt token
    const verified = await this.authTokenAdapter.verify(payloadData);
    if (!verified) return this.app.throw(401);
    const passport = await this.passportAdapter.deserialize(payloadData);
    if (!passport) return this.app.throw(401);
    await this.setCurrent(passport);
    return payloadData;
  }

  public async refreshAuthToken(refreshToken: string) {
    // checkAuthToken by code
    let payloadData = await this.checkAuthToken(refreshToken, 'refresh');
    if (!payloadData) return this.app.throw(401);
    // refreshAuthToken
    const configRefreshAuthToken = this.scope.config.passport.refreshAuthToken;
    payloadData = await this._handlePayloadData(payloadData, { authToken: configRefreshAuthToken });
    // jwt token
    return await this.bean.jwt.create(payloadData);
  }

  // only created by accessToken
  public async createTempAuthToken(options?: IJwtSignOptions) {
    // current
    const passport = this.getCurrent();
    if (!passport) return this.app.throw(401);
    // payloadData
    const payloadData = await this._passportSerialize(passport, { authToken: 'nochange' });
    // jwt token
    return await this.bean.jwt.createTempAuthToken(payloadData, options);
  }

  public async createOauthAuthToken(options?: IJwtSignOptions) {
    // current
    const passport = this.getCurrent();
    if (!passport) return this.app.throw(401);
    // payloadData
    const payloadData = await this._passportSerialize(passport, { authToken: 'nochange' });
    // jwt token
    return await this.bean.jwt.createOauthAuthToken(payloadData, options);
  }

  public async createOauthCode(options?: IJwtSignOptions) {
    // current
    const passport = this.getCurrent();
    if (!passport) return this.app.throw(401);
    // payloadData
    const payloadData = await this._passportSerialize(passport, { authToken: 'nochange' });
    // code
    return await this.bean.jwt.createOauthCode(payloadData, options);
  }

  public async createOauthCodeFromOauthAuthToken(accessToken: string, options?: IJwtSignOptions) {
    // payloadData
    const payloadData = await this.bean.jwt.get('access').verify(accessToken);
    if (!payloadData) return this.app.throw(401);
    // code
    return await this.bean.jwt.createOauthCode(payloadData, options);
  }

  public async createAuthTokenFromOauthCode(code: string) {
    // checkAuthToken by code
    const payloadData = await this.checkAuthToken(code, 'code');
    if (!payloadData) return this.app.throw(401);
    // jwt token
    return await this.bean.jwt.create(payloadData);
  }

  private async _passportSerialize(passport: IPassportBase, options?: ISigninOptions) {
    // serialize
    const payloadData = await this.passportAdapter.serialize(passport);
    return await this._handlePayloadData(payloadData, options);
  }

  private async _handlePayloadData(payloadData: IPayloadDataBase, options?: ISigninOptions) {
    // auth token
    const authToken = options?.authToken ?? 'refresh';
    if (authToken === 'recreate') {
      return await this.authTokenAdapter.create(payloadData);
    } else {
      const payloadData2 = await this.authTokenAdapter.retrieve(payloadData);
      if (!payloadData2) {
        return await this.authTokenAdapter.create(payloadData);
      }
      if (authToken === 'refresh') {
        await this.authTokenAdapter.refresh(payloadData2);
      } else if (authToken === 'nochange') {
        // do nothing
      }
      return payloadData2;
    }
  }
}
