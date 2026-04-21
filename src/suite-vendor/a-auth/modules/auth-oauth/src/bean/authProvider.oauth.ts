import type {
  IAuthenticateStrategyState,
  IAuthProviderClientOptions,
  IAuthProviderClientRecord,
  IAuthProviderVerify,
  IDecoratorAuthProviderOptions,
  TypeStrategyVerifyArgs,
} from 'vona-module-a-auth';
import type { IAuthUserProfile } from 'vona-module-a-user';

import { BeanBase } from 'vona';
import { AuthProvider } from 'vona-module-a-auth';

export interface IAuthProviderOauthClientRecord extends IAuthProviderClientRecord {}

export interface IAuthProviderOauthClientOptions extends IAuthProviderClientOptions {}

export interface IAuthProviderOptionsOauth extends IDecoratorAuthProviderOptions<
  keyof IAuthProviderOauthClientRecord,
  IAuthProviderOauthClientOptions
> {}

@AuthProvider<IAuthProviderOptionsOauth>()
export class AuthProviderOauth extends BeanBase implements IAuthProviderVerify {
  async verify(
    _args: TypeStrategyVerifyArgs,
    _clientOptions: IAuthProviderOauthClientOptions,
    _options: IAuthProviderOptionsOauth,
    _state?: IAuthenticateStrategyState,
  ): Promise<IAuthUserProfile> {
    // profile
    const profile: IAuthUserProfile = {
      id: '',
    };
    return profile;
  }
}
