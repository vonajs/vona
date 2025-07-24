import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { $Class } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-orm';
import { Api, v } from 'vona-module-a-openapi';
import { $locale } from '../.metadata/index.ts';

export interface IEntityOptionsVersion extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsVersion>('aVersion')
export class EntityVersion extends $Class.omit(EntityBaseSimple, ['iid', 'deleted']) {
  @Api.field(v.title($locale('Module')))
  module: string;

  @Api.field(v.title($locale('Version')))
  version: number;
}
