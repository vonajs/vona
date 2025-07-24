import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Entity, EntityBase } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';

export interface IEntityOptionsRole extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsRole>('homeRole', { openapi: { title: $locale('Role') } })
export class EntityRole extends EntityBase {
  @Api.field(v.title($locale('RoleName')))
  name: string;
}
