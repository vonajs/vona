import { Meta } from 'vona-module-a-meta';
import { BeanStatusBase } from 'vona-module-a-status';

export interface MetaStatus {
  get(name: 'smsProviders'): Promise<object | undefined>;
  set(name: 'smsProviders', value: object): Promise<void>;
}

@Meta()
export class MetaStatus extends BeanStatusBase {}
