import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
// import { ContainerScope } from '../index.js';

export interface ISceneCustomRecord {}

export type TypeDecoratorBeanOptionsSceneBase = 'scope' | 'meta' | keyof ISceneCustomRecord;

export interface IDecoratorBeanOptionsBase<T = unknown, OPTIONS = unknown> {
  /**
   * global: equal to name
   * others: module.scene.name
   */
  beanFullName: string;
  module: string;
  scene: TypeDecoratorBeanOptionsSceneBase;
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
