import type { IAuthProviderClientOptions, IAuthProviderClientRecord, IAuthProviderOauth2ClientOptions, IAuthProviderVerify, IDecoratorAuthProviderOptions, TypeStrategyOauth2VerifyArgs, TypeStrategyVerifyArgs } from 'vona-module-a-auth';
import type { IAuthUserProfile } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { AuthProvider } from 'vona-module-a-auth';

export interface IAuthProviderGithubClientRecord extends IAuthProviderClientRecord {}

export interface IAuthProviderGithubClientOptions extends IAuthProviderOauth2ClientOptions {
  userProfileURL?: string;
  userAgent?: string;
}

export interface IAuthProviderOptionsGithub extends IDecoratorAuthProviderOptions<
  keyof IAuthProviderGithubClientRecord,
  IAuthProviderGithubClientOptions
> {}

@AuthProvider<IAuthProviderOptionsGithub>({ redirect: true })
export class AuthProviderGithub extends BeanBase implements IAuthProviderVerify {
  async verify(
    _args: TypeStrategyOauth2VerifyArgs,
    _clientOptions: IAuthProviderGithubClientOptions,
    _options: IAuthProviderOptionsGithub,
  ): Promise<IAuthUserProfile> {
    // profile
    const profile: IAuthUserProfile = {
      id: '',
    };
    return profile;
  }
}
