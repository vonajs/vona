import { Meta } from 'vona';
import { BeanStatusBase } from 'vona-module-a-status';

export interface MetaStatus {
  get(name: any): Promise<any | undefined>;
  set(name: any, value: any): Promise<void>;
}

@Meta()
export class MetaStatus extends BeanStatusBase {}
