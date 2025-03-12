import type { IDecoratorAuthProviderOptions } from './authProvider.ts';

export interface IAuthenticateOptions<T extends IDecoratorAuthProviderOptions = IDecoratorAuthProviderOptions> {
  clientName?: keyof T['clients'] | undefined;
  clientOptions: T['default'];
}
