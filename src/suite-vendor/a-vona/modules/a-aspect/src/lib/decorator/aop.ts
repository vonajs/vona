import type { IDecoratorAopOptions } from '../../types/aop.ts';
import { createBeanDecorator } from 'vona';

export function Aop(options: IDecoratorAopOptions): ClassDecorator {
  return createBeanDecorator('aop', options);
}
