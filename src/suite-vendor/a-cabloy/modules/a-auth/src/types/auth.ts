import type { PowerPartial } from 'vona';
import type { IDecoratorAuthProviderOptions } from './authProvider.ts';

export type TypeAuthenticateIntention = 'login' | 'associate' | 'migrate';

export interface IAuthenticateState {
  intention?: TypeAuthenticateIntention;
  redirect?: string;
}

export interface IAuthenticateOptions<T extends IDecoratorAuthProviderOptions = IDecoratorAuthProviderOptions> {
  state?: IAuthenticateState;
  clientName?: Extract<keyof T['clients'], 'string'> | 'default' | undefined;
  clientOptions?: PowerPartial<T['default']>;
}
