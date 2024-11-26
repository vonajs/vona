import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
// import { ContainerScope } from '../index.js';

export type TypeDecoratorBeanOptionsSceneBase =
  | 'service'
  | 'aop'
  | 'virtual'
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
  | 'connection'
  | 'packet'
  | TypeDecoratorBeanOptionsScene;
export type TypeDecoratorBeanOptionsScene =
  | 'bean'
  | 'broadcast'
  | 'startup'
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
  | 'summer.cache'
  | 'captcha.provider'
  | 'sms.provider'
  | 'database.dialect';
export interface IDecoratorBeanOptionsBase<T = unknown> {
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
  aop: boolean | undefined;
  virtual?: boolean;
  moduleBelong?: string;
  options?: unknown;
  __aopChains__: MetadataKey[];
  __aopChainsKey__: Record<string, [MetadataKey, string][]>;
}

export interface IDecoratorBeanOptions {
  /** global: if omit */
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  // containerScope?: ContainerScope;
}

export type IDecoratorVirtualOptions = IDecoratorBeanOptions;

export interface IDecoratorServiceOptions {}

export interface IDecoratorAtomOptions {}

export interface IDecoratorControllerOptions {
  path?: string;
}

// export type IDecoratorBeanOptions<T = unknown> = Omit<
//   Partial<IDecoratorBeanOptionsBase<T>>,
//   'beanFullName' | 'module' | 'name' | 'beanClass'
// > &
//   Pick<IDecoratorBeanOptionsBase, 'name'>;
