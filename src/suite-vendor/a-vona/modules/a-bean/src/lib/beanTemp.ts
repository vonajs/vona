import type { IDecoratorBeanTempOptions } from '../types/beanTemp.js';
import { createBeanDecorator } from 'vona';

export function BeanTemp(options: IDecoratorBeanTempOptions): ClassDecorator {
  return createBeanDecorator(options.scene as any, options);
}
