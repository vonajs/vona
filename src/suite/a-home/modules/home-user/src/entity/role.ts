import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';

export interface IEntityOptionsRole extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsRole>('homeRole')
export class EntityRole extends EntityBase {
  @Api.field(v.title($locale('RoleName')))
  name: string;
}
