import type { IInstanceStartupOptions } from 'vona-module-a-startup';
import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

@Entity('aInstance')
export class EntityInstance extends ClassMapped.omit(EntityBaseSimple, ['iid']) {
  @Api.field()
  disabled: boolean;

  @Api.field()
  name: string;

  @Api.field()
  title: string;

  @Api.field()
  config: string;
}

export interface IInstanceStartupQueueInfo {
  resolve: Function;
  reject: Function;
  instanceName: string;
  options: IInstanceStartupOptions;
}
