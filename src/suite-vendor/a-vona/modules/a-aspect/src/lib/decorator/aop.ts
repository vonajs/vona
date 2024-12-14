import { createBeanDecorator } from 'vona';
import { IDecoratorAopOptions } from '../../types/aop.js';

export function Aop(options: IDecoratorAopOptions): ClassDecorator {
  return createBeanDecorator('aop', options);
}
