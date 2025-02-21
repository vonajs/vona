import type { IDecoratorPipeOptions } from '../../types/pipe.ts';
import { createBeanDecorator } from 'vona';

export function Pipe<T extends IDecoratorPipeOptions>(options?: T, optionsPrimitive?: boolean): ClassDecorator {
  return createBeanDecorator('pipe', options, optionsPrimitive);
}
