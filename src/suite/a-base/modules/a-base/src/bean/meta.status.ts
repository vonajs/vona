import { Meta } from 'vona';
import { BeanStatusBase } from 'vona-module-a-status';

export interface MetaStatus {
  get(name: 'roleDirty'): Promise<boolean | undefined>;
  set(name: 'roleDirty', value: boolean): Promise<void>;
}

@Meta()
export class MetaStatus extends BeanStatusBase {}
