import { BeanBase } from '../../../index.js';
import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
import { ContainerScope } from '../index.js';

export interface IDecoratorBeanOptionsBase<T = unknown> {
  /**
   * global: equal to name
   * others: module.scene.name
   */
  beanFullName: string;
  module: string;
  scene: string | undefined;
  name: string;
  beanClass: Constructable<T>;
  scope: ContainerScope | undefined;
  aop: boolean | undefined;
  moduleScope: boolean | undefined;
  __aopChains__: MetadataKey[];
  __aopChainsKey__: Record<string, [MetadataKey, string][]>;
}

export interface IDecoratorBeanOptions<T = unknown> {
  /** global: if omit */
  scene?: string;
  name?: string;
  scope?: ContainerScope;
  magic?: boolean;
}

export type IDecoratorLocalOptions<T = unknown> = Omit<IDecoratorBeanOptions<T>, 'scene'>;

// export type IDecoratorBeanOptions<T = unknown> = Omit<
//   Partial<IDecoratorBeanOptionsBase<T>>,
//   'beanFullName' | 'module' | 'name' | 'beanClass'
// > &
//   Pick<IDecoratorBeanOptionsBase, 'name'>;
