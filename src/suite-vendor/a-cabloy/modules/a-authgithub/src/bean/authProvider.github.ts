import type { IAuthProviderClientOptions, IAuthProviderClientRecord, IAuthProviderExecute, IDecoratorAuthProviderOptions } from 'vona-module-a-auth';
import type { IAuthUserProfile } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { AuthProvider } from 'vona-module-a-auth';

export interface IAuthProviderGithubClientRecord extends IAuthProviderClientRecord {}

export interface IAuthProviderGithubClientOptions extends IAuthProviderClientOptions {}

export interface IAuthProviderOptionsGithub extends IDecoratorAuthProviderOptions<
  keyof IAuthProviderGithubClientRecord,
  IAuthProviderGithubClientOptions
> {}

@AuthProvider<IAuthProviderOptionsGithub>({ redirect: true })
export class AuthProviderGithub extends BeanBase implements IAuthProviderExecute {
  async execute(_clientOptions: IAuthProviderGithubClientOptions, _options: IAuthProviderOptionsGithub): Promise<IAuthUserProfile> {
    // profile
    const profile: IAuthUserProfile = {
      id: '',
    };
    return profile;
  }
}
