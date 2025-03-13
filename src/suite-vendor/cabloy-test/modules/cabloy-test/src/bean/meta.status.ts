import { Meta } from 'vona-module-a-meta';
import { BeanStatusBase } from 'vona-module-a-status';

interface IStatusUser {
  name: string;
  age: number;
}

export interface MetaStatus {
  get(name: 'enable'): Promise<boolean | undefined>;
  set(name: 'enable', value: boolean): Promise<void>;
  get(name: 'user'): Promise<IStatusUser | undefined>;
  set(name: 'user', value: IStatusUser): Promise<void>;
}

@Meta()
export class MetaStatus extends BeanStatusBase {}
