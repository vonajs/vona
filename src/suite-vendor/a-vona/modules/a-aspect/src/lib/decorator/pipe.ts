import { createBeanDecorator } from 'vona';
import type { IDecoratorPipeOptions } from '../../types/pipe.js';

export function Pipe<T extends IDecoratorPipeOptions>(options?: T, optionsPrimitive?: boolean): ClassDecorator {
  return createBeanDecorator('pipe', options, optionsPrimitive);
}
