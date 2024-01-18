import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
import { ContainerScope } from '../index.js';

export type TypeDecoratorBeanOptionsSceneBase = 'local' | 'aop' | 'virtual' | TypeDecoratorBeanOptionsScene;
export type TypeDecoratorBeanOptionsScene = 'broadcast' | 'startup' | 'version' | 'middleware';
export interface IDecoratorBeanOptionsBase<T = unknown> {
  /**
   * global: equal to name
   * others: module.scene.name
   */
  beanFullName: string;
  module: string;
  scene?: TypeDecoratorBeanOptionsSceneBase;
  name: string;
  beanClass: Constructable<T>;
  scope?: ContainerScope;
  aop: boolean | undefined;
  aopMatch?: string | RegExp | (string | RegExp)[];
  virtual?: boolean;
  moduleScope?: string;
  __aopChains__: MetadataKey[];
  __aopChainsKey__: Record<string, [MetadataKey, string][]>;
}

export interface IDecoratorBeanOptions {
  /** global: if omit */
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  scope?: ContainerScope;
}

export type IDecoratorVirtualOptions = IDecoratorBeanOptions;

export interface IDecoratorLocalOptions {
  name?: string;
  scope?: ContainerScope;
}
export interface IDecoratorAopOptions {
  name?: string;
  scope?: ContainerScope;
  match: string;
}

// export type IDecoratorBeanOptions<T = unknown> = Omit<
//   Partial<IDecoratorBeanOptionsBase<T>>,
//   'beanFullName' | 'module' | 'name' | 'beanClass'
// > &
//   Pick<IDecoratorBeanOptionsBase, 'name'>;
