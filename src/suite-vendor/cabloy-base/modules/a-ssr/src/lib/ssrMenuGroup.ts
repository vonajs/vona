import type { IDecoratorSsrMenuGroupOptions } from '../types/ssrMenuGroup.ts';
import { createBeanDecorator } from 'vona';

export function SsrMenuGroup<T extends IDecoratorSsrMenuGroupOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('ssrMenuGroup', options);
}
