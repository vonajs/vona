import type { IDecoratorModelOptions } from '../types/onion/model.ts';
import { createBeanDecorator } from 'vona';

export function Model<T extends IDecoratorModelOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('model', options);
}
