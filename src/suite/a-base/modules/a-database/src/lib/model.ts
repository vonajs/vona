import { createBeanDecorator } from 'vona';
import { IDecoratorModelOptions } from '../types/onionModel.js';

export function Model(options?: IDecoratorModelOptions): ClassDecorator {
  return createBeanDecorator('model', options);
}
