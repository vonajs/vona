import type { IDecoratorAuthProviderOptions } from './authProvider.ts';

export interface IAuthenticateOptions<T extends IDecoratorAuthProviderOptions = IDecoratorAuthProviderOptions> {
  clientName?: keyof T['clients'] | undefined;
  clientOptions: T['default'];
}

export interface IAuthUserProfilePropObject {
  value: string;
}
export interface IAuthUserProfile {
  id: string;
  username: string;
  displayName?: string;
  profileUrl?: string;
  emails?: IAuthUserProfilePropObject[];
  photos?: IAuthUserProfilePropObject[];
}
