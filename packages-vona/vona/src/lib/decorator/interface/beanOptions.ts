import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
// import { ContainerScope } from '../index.js';

export type TypeDecoratorBeanOptionsSceneBase =
  | 'service'
  | 'aop'
  | 'scope'
  | 'controller'
  | 'entity'
  | 'dto'
  | 'model'
  | 'atom'
  | 'middleware'
  | 'guard'
  | 'interceptor'
  | 'pipe'
  | 'filter'
  | 'socketConnection'
  | 'socketPacket'
  | 'summerCache'
  | 'startup'
  | 'meta'
  | TypeDecoratorBeanOptionsScene;
export type TypeDecoratorBeanOptionsScene =
  | 'bean'
  | 'broadcast'
  | 'queue'
  | 'version'
  | 'schedule'
  | 'middleware'
  | 'event'
  | 'stats'
  | 'sequence'
  | 'test'
  | 'flow.node'
  | 'flow.edge'
  | 'flow.behavior'
  | 'flow.service'
  | 'auth.provider'
  | 'cli.create'
  | 'cli.default'
  | 'cli.front'
  | 'cli.git'
  | 'cli.store'
  | 'cli.token'
  | 'cli.tools'
  | 'io.message'
  | 'io.channel'
  | 'captcha.provider'
  | 'sms.provider'
  | 'database.dialect';
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

export interface IDecoratorBeanOptions {
  /** global: if omit */
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  // containerScope?: ContainerScope;
}

export interface IDecoratorServiceOptions {}

export interface IDecoratorAtomOptions {}

// export type IDecoratorBeanOptions<T = unknown> = Omit<
//   Partial<IDecoratorBeanOptionsBase<T>>,
//   'beanFullName' | 'module' | 'name' | 'beanClass'
// > &
//   Pick<IDecoratorBeanOptionsBase, 'name'>;
