import type { IDecoratorSsrMenuOptions } from '../types/ssrMenu.ts';
import { createBeanDecorator } from 'vona';

export function SsrMenu<T extends IDecoratorSsrMenuOptions<any>>(options?: T): ClassDecorator {
  return createBeanDecorator('ssrMenu', options);
}
