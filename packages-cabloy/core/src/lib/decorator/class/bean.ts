import { IDecoratorBeanOptions, IDecoratorBeanOptionsBase } from '../index.js';

export function Bean<T>(options: IDecoratorBeanOptions<T>): ClassDecorator {
  return function (target) {
    const beanOptions: IDecoratorBeanOptionsBase = {};
  };
}
