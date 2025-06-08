import type { IInstanceRecord } from 'vona';
import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import type { IInstanceStartupOptions } from 'vona-module-a-startup';
import { ClassMapped } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';
import z from 'zod';

export interface IEntityOptionsInstance extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsInstance>('aInstance')
export class EntityInstance extends ClassMapped.omit(EntityBaseSimple, ['iid']) {
  @Api.field()
  disabled: boolean;

  @Api.field(z.string())
  name: keyof IInstanceRecord;

  @Api.field()
  title: string;

  @Api.field()
  config: string;
}

export interface IInstanceStartupQueueInfo {
  resolve: Function;
  reject: Function;
  instanceName: keyof IInstanceRecord;
  options: IInstanceStartupOptions;
}
