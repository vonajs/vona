import type { Constructable } from 'vona';
import type { IAuthProviderClientRecord, IAuthProviderOauth2ClientOptions, IDecoratorAuthProviderOptions, StrategyBase } from 'vona-module-a-auth';
import StrategyGithub from 'passport-github';
import { AuthProvider, BeanAuthProviderOauth2Base } from 'vona-module-a-auth';

export interface IAuthProviderGithubClientRecord extends IAuthProviderClientRecord {}

export interface IAuthProviderGithubClientOptions extends IAuthProviderOauth2ClientOptions {
  userProfileURL?: string;
  userAgent?: string;
}

export interface IAuthProviderOptionsGithub extends IDecoratorAuthProviderOptions<
  keyof IAuthProviderGithubClientRecord,
  IAuthProviderGithubClientOptions
> {}

@AuthProvider<IAuthProviderOptionsGithub>({ default: { confirmed: true, clientID: 'xxxxxx', clientSecret: 'xxxxxx' } })
export class AuthProviderGithub extends BeanAuthProviderOauth2Base {
  async strategy(_clientOptions: IAuthProviderGithubClientOptions, _options: IAuthProviderOptionsGithub): Promise<Constructable<StrategyBase>> {
    return StrategyGithub;
  }
}
