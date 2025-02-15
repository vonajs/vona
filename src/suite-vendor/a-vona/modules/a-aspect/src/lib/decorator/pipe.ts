import type { IDecoratorPipeOptions } from '../../types/pipe.js';
import { createBeanDecorator } from 'vona';

export function Pipe<T extends IDecoratorPipeOptions>(options?: T, optionsPrimitive?: boolean): ClassDecorator {
  return createBeanDecorator('pipe', options, optionsPrimitive);
}
