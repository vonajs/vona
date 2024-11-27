import { IDecoratorPipeOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Pipe<T extends IDecoratorPipeOptions>(options?: T, optionsPrimitive?: boolean): ClassDecorator {
  return createBeanDecorator('pipe', options, optionsPrimitive);
}
