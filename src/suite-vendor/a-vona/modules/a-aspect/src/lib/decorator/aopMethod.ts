import type { IDecoratorAopMethodOptions } from '../../types/aopMethod.ts';
import { createBeanDecorator } from 'vona';

export function AopMethod<T extends IDecoratorAopMethodOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('aopMethod', options);
}
