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
  async execute(clientOptions: IAuthProviderSimpleClientOptions, _options: IAuthProviderOptionsSimple) {
    // user
    const user = await this.bean.userInner.getByName(clientOptions.username);
    if (!user) return this.app.throw(401);
    // verify
    const verified = await this.scope.service.authSimple.verify(user.id, clientOptions.password);
    if (!verified) return this.app.throw(401);
  }
}
