import { IInstanceStartupOptions, omitClass } from 'vona';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

@Entity('aInstance')
export class EntityInstance extends omitClass(EntityBase, ['iid']) {
  @Rule(z.boolean())
  disabled: boolean;
  @Rule(z.string())
  name: string;
  @Rule(z.string())
  title: string;
  @Rule(z.string())
  config: string;
}

export interface IInstanceStartupQueueInfo {
  resolve: Function;
  reject: Function;
  subdomain: string;
  options: IInstanceStartupOptions;
}
