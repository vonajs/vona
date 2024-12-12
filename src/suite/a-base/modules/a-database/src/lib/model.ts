import { IDecoratorModelOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Model(options?: IDecoratorModelOptions): ClassDecorator {
  return createBeanDecorator('model', options);
}
