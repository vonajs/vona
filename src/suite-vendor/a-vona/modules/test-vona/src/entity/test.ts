import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';

export interface IEntityOptionsTest extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsTest>('testVonaTest', { openapi: { title: $locale('Test') } })
export class EntityTest extends EntityBase {
  @Api.field(v.title($locale('Test')))
  title: string;

  @Api.field()
  description: string;
}
