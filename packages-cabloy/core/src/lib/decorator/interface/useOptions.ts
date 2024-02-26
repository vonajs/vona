import { ContainerScope, MetadataKey } from '../../../index.js';

export interface IDecoratorUseOptionsBase {
  prop: MetadataKey;
  beanFullName: string;
  /** such as: moduleScope */
  selector?: string;
  containerScope?: ContainerScope;
}

export interface IDecoratorUseOptions {
  beanFullName?: string;
  moduleScope?: string;
  containerScope?: ContainerScope;
}
