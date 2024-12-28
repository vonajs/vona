import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
// import { ContainerScope } from '../index.js';

export interface IBeanSceneRecord {}

export interface IDecoratorBeanOptionsBase<T = unknown, OPTIONS = unknown> {
  /**
   * global: equal to name
   * others: module.scene.name
   */
  beanFullName: string;
  module: string;
  scene: keyof IBeanSceneRecord;
  name: string;
  beanClass: Constructable<T>;
  // containerScope?: ContainerScope;
  virtual?: boolean;
  moduleBelong?: string;
  options?: OPTIONS;
  optionsPrimitive?: boolean;
  __aopChains__: MetadataKey[];
  __aopChainsKey__: Record<string, [MetadataKey, string][]>;
}
