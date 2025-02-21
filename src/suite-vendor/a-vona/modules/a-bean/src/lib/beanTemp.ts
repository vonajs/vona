import type { IDecoratorBeanTempOptions } from '../types/beanTemp.ts';
import { createBeanDecorator } from 'vona';

export function BeanTemp(options: IDecoratorBeanTempOptions): ClassDecorator {
  return createBeanDecorator(options.scene as any, options);
}
