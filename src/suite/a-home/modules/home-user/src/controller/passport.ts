import type { IAuthenticateOptions, IAuthProviderRecord } from 'vona-module-a-auth';
import { BeanBase } from 'vona';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Arg, v } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';
import { z } from 'zod';
import { DtoPassport } from '../dto/passport.ts';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Web.get('login/:module/:providerName/:clientName?')
  @Passport.public()
  @Api.body(v.object(DtoPassport))
  login<T extends keyof IAuthProviderRecord>(
    @Arg.query('redirect') redirect: string,
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
  ) {
    return this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'login', redirect },
      clientName,
    });
  }

  @Web.get('associate/:module/:providerName/:clientName?')
  associate<T extends keyof IAuthProviderRecord>(
    @Arg.query('redirect') redirect: string,
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
  ) {
    return this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'associate', redirect },
      clientName,
    });
  }

  @Web.get('migrate/:module/:providerName/:clientName?')
  migrate<T extends keyof IAuthProviderRecord>(
    @Arg.query('redirect') redirect: string,
    @Arg.param('module') module: string,
    @Arg.param('providerName') providerName: string,
    @Arg.param('clientName', z.string().optional()) clientName?: IAuthenticateOptions<IAuthProviderRecord[T]>['clientName'],
  ) {
    return this.bean.auth.authenticate(`${module}:${providerName}` as T, {
      state: { intention: 'migrate', redirect },
      clientName,
    });
  }

  @Web.post('refreshAuthToken')
  @Passport.public()
  @Api.body(v.object(DtoJwtToken))
  async refreshAuthToken(@Arg.body('refreshToken') refreshToken: string): Promise<DtoJwtToken> {
    return await this.bean.passport.refreshAuthToken(refreshToken);
  }

  @Web.post('createAuthTokenFromOauthCode')
  @Passport.public()
  @Api.body(v.object(DtoJwtToken))
  async createAuthTokenFromOauthCode(@Arg.body('code') code: string): Promise<DtoJwtToken> {
    return await this.bean.passport.createAuthTokenFromOauthCode(code);
  }
}
