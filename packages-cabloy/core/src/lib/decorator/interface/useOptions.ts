import { ContainerScope, MetadataKey } from '../../../index.js';

export interface IDecoratorUseOptionsBase {
  prop: MetadataKey;
  beanFullName: string;
  moduleScope?: string;
  containerScope?: ContainerScope;
}

export interface IDecoratorUseOptions {
  moduleScope?: string;
  containerScope?: ContainerScope;
}
