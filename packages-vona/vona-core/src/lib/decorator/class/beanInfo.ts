import type { IDecoratorBeanInfoOptions } from '../interface/beanOptions.ts';
import { appMetadata } from '../../core/metadata.ts';
import { DecoratorBeanInfo } from '../../core/resource.ts';

export function BeanInfo(options: IDecoratorBeanInfoOptions): ClassDecorator {
  return function (target) {
    // set metadata
    appMetadata.defineMetadata(DecoratorBeanInfo, options, target);
  };
}
