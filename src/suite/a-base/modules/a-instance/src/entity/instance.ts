import { EntityBaseTemp } from 'vona-module-a-base';
import { ConfigInstanceBase, Entity } from 'vona';
import { OmitType } from 'vona-module-a-swagger';

@Entity('aInstance')
export class EntityInstance extends OmitType(EntityBaseTemp, ['iid']) {
  disabled: number;
  name: string;
  title: string;
  config: string;
}

export interface IInstanceStartupOptions {
  force?: boolean;
  configInstanceBase?: ConfigInstanceBase;
}

export interface IInstanceStartupQueueInfo {
  resolve: Function;
  reject: Function;
  subdomain: string;
  options: IInstanceStartupOptions;
}
