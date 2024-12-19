import { createBeanDecorator } from 'vona';
import { IDecoratorBeanTempOptions } from '../types/beanTemp.js';

export function BeanTemp(options: IDecoratorBeanTempOptions): ClassDecorator {
  return createBeanDecorator(options.scene as any, options);
}
