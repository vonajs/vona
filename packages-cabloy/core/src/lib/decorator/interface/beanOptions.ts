import { IModuleMiddlewareGate } from '../../bean/index.js';
import { IModelOptions } from '../../bean/resource/model/type.js';
import { MetadataKey } from '../../core/metadata.js';
import { Constructable } from '../index.js';
import { ContainerScope } from '../index.js';

export type TypeDecoratorBeanOptionsSceneBase =
  | 'local'
  | 'aop'
  | 'virtual'
  | 'scope'
  | 'controller'
  | 'model'
  | 'atom'
  | TypeDecoratorBeanOptionsScene;
export type TypeDecoratorBeanOptionsScene =
  | 'bean'
  | 'broadcast'
  | 'startup'
  | 'queue'
  | 'version'
  | 'middleware'
  | 'middleware.io'
  | 'event'
  | 'stats'
  | 'sequence'
  | 'local.flow'
  | 'flow.node'
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
  | 'sms.provider';
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
  containerScope?: ContainerScope;
  aop: boolean | undefined;
  aopMatch?: string | RegExp | (string | RegExp)[];
  virtual?: boolean;
  moduleBelong?: string;
  gate?: IModuleMiddlewareGate;
  options?: unknown;
  __aopChains__: MetadataKey[];
  __aopChainsKey__: Record<string, [MetadataKey, string][]>;
}

export interface IDecoratorBeanOptions {
  /** global: if omit */
  scene?: TypeDecoratorBeanOptionsScene;
  name?: string;
  containerScope?: ContainerScope;
}

export type IDecoratorVirtualOptions = IDecoratorBeanOptions;

export interface IDecoratorLocalOptions {
  name?: string;
  containerScope?: ContainerScope;
}

export interface IDecoratorAtomOptions {
  name?: string;
}

export interface IDecoratorControllerOptions {
  name?: string;
}

export interface IDecoratorModelOptions {
  name?: string;
  table: string;
  options: IModelOptions;
}

export interface IDecoratorAopOptions {
  name?: string;
  match: string | RegExp | (string | RegExp)[];
  gate?: IModuleMiddlewareGate;
}

// export type IDecoratorBeanOptions<T = unknown> = Omit<
//   Partial<IDecoratorBeanOptionsBase<T>>,
//   'beanFullName' | 'module' | 'name' | 'beanClass'
// > &
//   Pick<IDecoratorBeanOptionsBase, 'name'>;
