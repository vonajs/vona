import { IBeanRecord, InjectionScope, MetadataKey } from '../../../index.js';

export interface IDecoratorUseOptionsBase {
  prop: MetadataKey;
  beanFullName: string;
  /** such as: moduleScope */
  selector?: string;
  injectionScope?: InjectionScope;
}

export interface IDecoratorUseOptions {
  beanFullName?: keyof IBeanRecord;
  selector?: string;
  //injectionScope?: InjectionScope;
}
