import type { IAuthProviderClientOptions, IAuthProviderClientRecord, IAuthProviderExecute, IDecoratorAuthProviderOptions } from 'vona-module-a-auth';
import { BeanBase } from 'vona';
import { AuthProvider } from 'vona-module-a-auth';

export interface IAuthProviderSimpleClientRecord extends IAuthProviderClientRecord {}

export interface IAuthProviderSimpleClientOptions extends IAuthProviderClientOptions {
  username: string;
  password: string;
}

export interface IAuthProviderOptionsSimple extends IDecoratorAuthProviderOptions<
  keyof IAuthProviderSimpleClientRecord,
  IAuthProviderSimpleClientOptions
> {}

@AuthProvider<IAuthProviderOptionsSimple>()
export class AuthProviderSimple extends BeanBase implements IAuthProviderExecute {
  async execute(_clientOptions: IAuthProviderSimpleClientOptions, _options: IAuthProviderOptionsSimple) {
    // user
    //const user=await this.bean.user.
  }
}
