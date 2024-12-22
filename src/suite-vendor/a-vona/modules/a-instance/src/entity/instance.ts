import { OmitClass } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';
import { IInstanceStartupOptions } from 'vona-module-a-startup';
import { Rule } from 'vona-module-a-validation';

@Entity('aInstance')
export class EntityInstance extends OmitClass(EntityBase, ['iid']) {
  @Rule()
  disabled: boolean;
  @Rule()
  name: string;
  @Rule()
  title: string;
  @Rule()
  config: string;
}

export interface IInstanceStartupQueueInfo {
  resolve: Function;
  reject: Function;
  subdomain: string;
  options: IInstanceStartupOptions;
}
