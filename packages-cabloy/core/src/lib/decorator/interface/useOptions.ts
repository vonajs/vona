import { MetadataKey } from '../../../index.js';

export interface IDecoratorUseOptionsBase {
  prop: MetadataKey;
  beanFullName: string;
  moduleScope?: string;
}

export type IDecoratorUseOptions = Pick<IDecoratorUseOptionsBase, 'moduleScope'>;
