import type { IAuthenticateOptions, IAuthProviderRecord } from 'vona-module-a-auth';
import type { IJwtToken } from 'vona-module-a-jwt';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { EntityRole } from '../entity/role.ts';
import type { EntityUser } from '../entity/user.ts';
import { BeanBase } from 'vona';
import { DtoAuthSimple } from 'vona-module-a-authsimple';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Arg, v } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';
import { z } from 'zod';
import { DtoPassport } from '../dto/passport.ts';
import { DtoPassportJwt } from '../dto/passportJwt.ts';

export interface IControllerOptionsPassport extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPassport>('passport')
export class ControllerPassport extends BeanBase {
  @Web.get('current')
  @Passport.public()
  @Api.body(v.optional(), v.object(DtoPassport))
  current(): DtoPassport | undefined {
    return this._combineDtoPassport();
  }

  @Web.post('logout')
  async logout() {
    return await this.bean.passport.signout();
  }

  @Web.post('login')
  @Passport.public()
  @Api.body(v.object(DtoPassportJwt))
  async loginSimple(@Arg.body() clientOptions: DtoAuthSimple): Promise<DtoPassportJwt> {
    const jwt = await this.bean.authSimple.authenticate(clientOptions, 'default');
    return this._combineDtoPassportJwt(jwt);
  }

  @Web.get('login/:module/:providerName/:clientName?')
  @Passport.public()
  @Api.body(v.object(DtoPassportJwt))
  async login<T extends keyof IAuthProviderRecord>(
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
    @Arg.query('redirect', v.optional()) redirect?: string,
  ): Promise<DtoPassportJwt> {
    const jwt = await this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'login', redirect },
      clientName,
    });
    return this._combineDtoPassportJwt(jwt);
  }

  @Web.get('associate/:module/:providerName/:clientName?')
  @Api.body(v.object(DtoPassportJwt))
  async associate<T extends keyof IAuthProviderRecord>(
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
    @Arg.query('redirect', v.optional()) redirect?: string,
  ): Promise<DtoPassportJwt> {
    const jwt = await this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'associate', redirect },
      clientName,
    });
    return this._combineDtoPassportJwt(jwt);
  }

  @Web.get('migrate/:module/:providerName/:clientName?')
  @Api.body(v.object(DtoPassportJwt))
  async migrate<T extends keyof IAuthProviderRecord>(
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
    @Arg.query('redirect', v.optional()) redirect?: string,
  ): Promise<DtoPassportJwt> {
    const jwt = await this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'migrate', redirect },
      clientName,
    });
    return this._combineDtoPassportJwt(jwt);
  }

  @Web.post('refreshAuthToken')
  @Passport.public()
  @Api.body(v.object(DtoJwtToken))
  async refreshAuthToken(@Arg.body('refreshToken') refreshToken: string): Promise<DtoJwtToken> {
    return await this.bean.passport.refreshAuthToken(refreshToken);
  }

  @Web.post('createPassportJwtFromOauthCode')
  @Passport.public()
  @Api.body(v.object(DtoPassportJwt))
  async createPassportJwtFromOauthCode(@Arg.body('code') code: string): Promise<DtoPassportJwt> {
    const jwt = await this.bean.passport.createAuthTokenFromOauthCode(code);
    return this._combineDtoPassportJwt(jwt);
  }

  private _combineDtoPassportJwt(jwt?: IJwtToken): DtoPassportJwt {
    if (!jwt) this.app.throw(403);
    return {
      passport: this._combineDtoPassport()!,
      jwt: jwt as DtoJwtToken,
    };
  }

  private _combineDtoPassport(): DtoPassport | undefined {
    const passport = this.bean.passport.getCurrent();
    if (!passport || !passport.auth) return;
    return {
      user: passport.user as EntityUser,
      auth: { id: passport.auth!.id },
      roles: passport.roles as EntityRole[],
    };
  }
}
