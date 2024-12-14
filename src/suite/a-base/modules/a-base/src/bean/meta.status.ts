import { Meta } from 'vona-module-a-meta';
import { BeanStatusBase } from 'vona-module-a-status';

export interface MetaStatus {
  get(name: 'roleDirty'): Promise<boolean | undefined>;
  set(name: 'roleDirty', value: boolean): Promise<void>;
  get<T extends string>(name: `user-layoutConfig:${T}`): Promise<object | undefined>;
  set<T extends string>(name: `user-layoutConfig:${T}`, value: object): Promise<void>;
}

@Meta()
export class MetaStatus extends BeanStatusBase {}
