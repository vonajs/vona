import { createBeanDecorator } from 'vona';
import type { IDecoratorModelOptions } from '../types/onion/model.js';

export function Model(options?: IDecoratorModelOptions): ClassDecorator {
  return createBeanDecorator('model', options);
}
