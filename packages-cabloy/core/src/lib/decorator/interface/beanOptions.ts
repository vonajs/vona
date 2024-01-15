import { Constructable } from '../index.js';

export interface IDecoratorBeanOptions<Type = unknown> {
  moduleName: string;
  /** global: if empty */
  sceneName: string;
  beanName: string;
  beanClass: Constructable<Type>;
}
