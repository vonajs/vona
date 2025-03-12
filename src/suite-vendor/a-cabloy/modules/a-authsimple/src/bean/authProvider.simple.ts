import type { Next } from 'vona';
import type { IAuthProviderClientOptions, IAuthProviderClientRecord, IAuthProviderExecute, IDecoratorAuthProviderOptions } from 'vona-module-a-auth';
import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

export interface IAuthProviderSimpleClientRecord extends IAuthProviderClientRecord {}

export interface IAuthProviderSimpleClientOptions extends IAuthProviderClientOptions {
  username: string;
  password: string;
}

export interface IAuthProviderOptionsSimple extends IDecoratorAuthProviderOptions<
  keyof IAuthProviderSimpleClientRecord,
  IAuthProviderSimpleClientOptions
> {}

@Middleware<IAuthProviderOptionsSimple>()
export class AuthProviderSimple extends BeanBase implements IAuthProviderExecute {
  async execute(_options: IAuthProviderOptionsSimple, next: Next) {
    // next
    return next();
  }
}
