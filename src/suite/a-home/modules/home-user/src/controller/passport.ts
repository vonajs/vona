import type { IAuthenticateOptions, IAuthProviderRecord } from 'vona-module-a-auth';
import { BeanBase } from 'vona';
import { Arg } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';
import { z } from 'zod';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Web.get('login/:module/:providerName/:clientName?')
  @Passport.public()
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
}
