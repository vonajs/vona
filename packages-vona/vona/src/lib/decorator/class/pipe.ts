import { IDecoratorPipeOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Pipe<T extends IDecoratorPipeOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('pipe', options);
}
