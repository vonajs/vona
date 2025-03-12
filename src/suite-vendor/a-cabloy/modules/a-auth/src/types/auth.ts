import type { IDecoratorAuthProviderOptions } from './authProvider.ts';

export interface IAuthenticateOptions<T extends IDecoratorAuthProviderOptions = IDecoratorAuthProviderOptions> {
  clientName?: keyof T['clients'] | undefined;
  clientOptions: T['default'];
}

export interface IAuthUserProfilePropSlice {
  value: string;
}

export interface IAuthUserProfileName {
  familyName?: string;
  givenName?: string;
  middleName?: string;
}
export interface IAuthUserProfile {
  id: string;
  username: string;
  displayName?: string;
  name?: IAuthUserProfileName;
  gender?: string; // male/female
  profileUrl?: string;
  emails?: IAuthUserProfilePropSlice[];
  photos?: IAuthUserProfilePropSlice[];
}
