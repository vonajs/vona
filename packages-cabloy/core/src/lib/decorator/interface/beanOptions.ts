import { BeanBase } from '../../../index.js';
import { BeanConstructable } from '../index.js';
import { ContainerScope } from '../index.js';

export interface IDecoratorBeanOptionsBase<Type extends BeanBase> {
  /**
   * global: equal to name
   * others: module.scene.name
   */
  fullName: string;
  module: string;
  scene: string | undefined;
  name: string;
  beanClass: BeanConstructable<Type>;
  scope: ContainerScope | undefined;
}

export interface IDecoratorBeanOptions<T = unknown> {
  /** global: if omit */
  scene?: string;
  name: string;
  scope?: ContainerScope;
}

export type IDecoratorLocalOptions<T = unknown> = Omit<IDecoratorBeanOptions<T>, 'scene'>;

// export type IDecoratorBeanOptions<T = unknown> = Omit<
//   Partial<IDecoratorBeanOptionsBase<T>>,
//   'fullName' | 'module' | 'name' | 'beanClass'
// > &
//   Pick<IDecoratorBeanOptionsBase, 'name'>;
