import type { IAuthProviderClientOptions, IAuthProviderClientRecord, IAuthProviderVerify, IDecoratorAuthProviderOptions, TypeStrategyVerifyArgs } from 'vona-module-a-auth';
import type { IAuthUserProfile } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { AuthProvider } from 'vona-module-a-auth';

export interface IAuthProviderSimpleClientRecord extends IAuthProviderClientRecord {}

export interface IAuthProviderSimpleClientOptions extends IAuthProviderClientOptions {
  username?: string;
  password?: string;
}

export interface IAuthProviderOptionsSimple extends IDecoratorAuthProviderOptions<
  keyof IAuthProviderSimpleClientRecord,
  IAuthProviderSimpleClientOptions
> {}

@AuthProvider<IAuthProviderOptionsSimple>()
export class AuthProviderSimple extends BeanBase implements IAuthProviderVerify {
  async verify(
    _args: TypeStrategyVerifyArgs,
    clientOptions: IAuthProviderSimpleClientOptions,
    _options: IAuthProviderOptionsSimple,
  ): Promise<IAuthUserProfile> {
    if (!clientOptions.username || !clientOptions.password) return this.app.throw(401);
    // user
    const user = await this.bean.userInner.findOneByName(clientOptions.username);
    if (!user) return this.app.throw(401);
    // verify
    const profileId = await this.scope.service.authSimple.verifyPassword(user.id, clientOptions.password);
    if (!profileId) return this.app.throw(401);
    // profile
    const profile: IAuthUserProfile = {
      id: profileId.toString(),
    };
    return profile;
  }
}
