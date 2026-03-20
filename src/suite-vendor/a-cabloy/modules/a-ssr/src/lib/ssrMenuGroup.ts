import { createBeanDecorator } from 'vona';

import type { IDecoratorSsrMenuGroupOptions } from '../types/ssrMenuGroup.ts';

export function SsrMenuGroup<T extends IDecoratorSsrMenuGroupOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('ssrMenuGroup', options);
}
