import type { PowerPartial } from 'vona';
import type { IDecoratorAuthProviderOptions } from '../types/authProvider.ts';
import { createBeanDecorator } from 'vona';

export function AuthProvider<T extends IDecoratorAuthProviderOptions>(options?: PowerPartial<T>): ClassDecorator {
  return createBeanDecorator('authProvider', options);
}
