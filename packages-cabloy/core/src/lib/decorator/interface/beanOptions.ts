import { Constructable } from '../index.js';
import { ContainerScope } from '../index.js';

export interface IDecoratorBeanOptionsBase<Type = unknown> {
  /**
   * global: equal to name
   * others: module.scene.name
   */
  fullName: string;
  module: string;
  /** global: if empty */
  scene: string | undefined;
  name: string;
  beanClass: Constructable<Type>;
  scope: ContainerScope | undefined;
}

export type IDecoratorBeanOptions<T = unknown> = Omit<
  Partial<IDecoratorBeanOptionsBase<T>>,
  'fullName' | 'module' | 'beanClass'
>;
