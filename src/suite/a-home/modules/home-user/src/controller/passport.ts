import type { IAuthenticateOptions, IAuthProviderRecord } from 'vona-module-a-auth';
import type { IJwtToken } from 'vona-module-a-jwt';
import type { EntityUser } from '../entity/user.ts';
import { BeanBase } from 'vona';
import { DtoAuthSimple } from 'vona-module-a-authsimple';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Arg, v } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';
import { z } from 'zod';
import { DtoPassport } from '../dto/passport.ts';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Web.post('login')
  @Passport.public()
  @Api.body(v.object(DtoPassport))
  async loginSimple(@Arg.body() clientOptions: DtoAuthSimple): Promise<DtoPassport> {
    const jwt = await this.bean.authSimple.authenticate(clientOptions, 'default');
    return this._combineDtoPassport(jwt);
  }

  @Web.get('login/:module/:providerName/:clientName?')
  @Passport.public()
  @Api.body(v.object(DtoPassport))
  async login<T extends keyof IAuthProviderRecord>(
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
    @Arg.query('redirect', v.optional()) redirect?: string,
  ): Promise<DtoPassport> {
    const jwt = await this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'login', redirect },
      clientName,
    });
    return this._combineDtoPassport(jwt);
  }

  @Web.get('associate/:module/:providerName/:clientName?')
  @Api.body(v.object(DtoPassport))
  async associate<T extends keyof IAuthProviderRecord>(
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
    @Arg.query('redirect', v.optional()) redirect?: string,
  ): Promise<DtoPassport> {
    const jwt = await this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'associate', redirect },
      clientName,
    });
    return this._combineDtoPassport(jwt);
  }

  @Web.get('migrate/:module/:providerName/:clientName?')
  @Api.body(v.object(DtoPassport))
  async migrate<T extends keyof IAuthProviderRecord>(
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
    @Arg.query('redirect', v.optional()) redirect?: string,
  ): Promise<DtoPassport> {
    const jwt = await this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'migrate', redirect },
      clientName,
    });
    return this._combineDtoPassport(jwt);
  }

  @Web.post('refreshAuthToken')
  @Passport.public()
  @Api.body(v.object(DtoJwtToken))
  async refreshAuthToken(@Arg.body('refreshToken') refreshToken: string): Promise<DtoJwtToken> {
    return await this.bean.passport.refreshAuthToken(refreshToken);
  }

  @Web.post('createPassportFromOauthCode')
  @Passport.public()
  @Api.body(v.object(DtoJwtToken))
  async createPassportFromOauthCode(@Arg.body('code') code: string): Promise<DtoJwtToken> {
    return await this.bean.passport.createAuthTokenFromOauthCode(code);
  }

  private _combineDtoPassport(jwt?: IJwtToken): DtoPassport {
    if (!jwt) this.app.throw(403);
    const passport = this.bean.passport.getCurrent()!;
    return {
      user: passport.user as EntityUser,
      auth: { id: passport.auth!.id },
      jwt: jwt as DtoJwtToken,
    };
  }
}
