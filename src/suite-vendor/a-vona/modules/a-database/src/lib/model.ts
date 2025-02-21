import type { IDecoratorModelOptions } from '../types/onion/model.ts';
import { createBeanDecorator } from 'vona';

export function Model(options?: IDecoratorModelOptions): ClassDecorator {
  return createBeanDecorator('model', options);
}
