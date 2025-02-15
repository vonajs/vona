import type { IDecoratorModelOptions } from '../types/onion/model.js';
import { createBeanDecorator } from 'vona';

export function Model(options?: IDecoratorModelOptions): ClassDecorator {
  return createBeanDecorator('model', options);
}
