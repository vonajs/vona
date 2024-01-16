import { BeanBase } from '../../../index.js';
import { Constructable } from '../index.js';
import { ContainerScope } from '../index.js';

export interface IDecoratorBeanOptionsBase<T = unknown> {
  /**
   * global: equal to name
   * others: module.scene.name
   */
  fullName: string;
  module: string;
  scene: string | undefined;
  name: string;
  beanClass: Constructable<T>;
  scope: ContainerScope | undefined;
  aop: boolean | undefined;
  __aopChains__: (string | symbol)[];
  __aopChainsKey__: Record<string, [string | symbol, string][]>;
}

export interface IDecoratorBeanOptions<T = unknown> {
  /** global: if omit */
  scene?: string;
  name: string;
  scope?: ContainerScope;
  magic?: boolean;
}

export type IDecoratorLocalOptions<T = unknown> = Omit<IDecoratorBeanOptions<T>, 'scene'>;

// export type IDecoratorBeanOptions<T = unknown> = Omit<
//   Partial<IDecoratorBeanOptionsBase<T>>,
//   'fullName' | 'module' | 'name' | 'beanClass'
// > &
//   Pick<IDecoratorBeanOptionsBase, 'name'>;
