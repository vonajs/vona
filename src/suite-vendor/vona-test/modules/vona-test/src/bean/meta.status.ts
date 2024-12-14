import { Meta } from 'vona-module-a-meta';
import { BeanStatusBase } from 'vona-module-a-status';

export interface MetaStatus {
  get(name: 'enable'): Promise<boolean | undefined>;
  set(name: 'enable', value: boolean): Promise<void>;
}

@Meta()
export class MetaStatus extends BeanStatusBase {}
