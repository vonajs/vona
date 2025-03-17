import type { Constructable } from 'vona';
import type { IAuthProviderClientRecord, IAuthProviderOauth2ClientOptions, IAuthProviderStrategy, IAuthProviderVerify, IDecoratorAuthProviderOptions, TypeStrategyOauth2VerifyArgs } from 'vona-module-a-auth';
import type { IAuthUserProfile } from 'vona-module-a-user';
import StrategyGithub from 'passport-github';
import { BeanBase } from 'vona';
import { AuthProvider } from 'vona-module-a-auth';
import { StrategyMock } from '../lib/strategyMock.ts';

export interface IAuthProviderGithubClientRecord extends IAuthProviderClientRecord {}

export interface IAuthProviderGithubClientOptions extends IAuthProviderOauth2ClientOptions {
  userProfileURL?: string;
  userAgent?: string;
}

export interface IAuthProviderOptionsGithub extends IDecoratorAuthProviderOptions<
  keyof IAuthProviderGithubClientRecord,
  IAuthProviderGithubClientOptions
> {
  useMockForDev: boolean;
}

@AuthProvider<IAuthProviderOptionsGithub>({ redirect: true, useMockForDev: true, default: { confirmed: true, clientID: 'xxxxxx', clientSecret: 'xxxxxx' } })
export class AuthProviderGithub extends BeanBase implements IAuthProviderStrategy, IAuthProviderVerify {
  async strategy(_clientOptions: IAuthProviderGithubClientOptions, options: IAuthProviderOptionsGithub): Promise<Constructable> {
    return (this.app.meta.isTest || this.app.meta.isLocal) && options.useMockForDev ? StrategyMock : StrategyGithub;
  }

  async verify(
    _args: TypeStrategyOauth2VerifyArgs,
    _clientOptions: IAuthProviderGithubClientOptions,
    _options: IAuthProviderOptionsGithub,
  ): Promise<IAuthUserProfile> {
    // confirmed
    // profile
    const profile: IAuthUserProfile = {
      id: '',
    };
    return profile;
  }
}
