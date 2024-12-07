import { Meta } from 'vona';
import { BeanStatusBase } from 'vona-module-a-status';

export interface MetaStatus {
  get(name: 'mailScenes'): Promise<object | undefined>;
  set(name: 'mailScenes', value: object): Promise<void>;
}

@Meta()
export class MetaStatus extends BeanStatusBase {}
