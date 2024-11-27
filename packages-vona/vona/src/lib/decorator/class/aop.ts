import { IDecoratorAopOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Aop(options: IDecoratorAopOptions): ClassDecorator {
  return createBeanDecorator('aop', options);
}
