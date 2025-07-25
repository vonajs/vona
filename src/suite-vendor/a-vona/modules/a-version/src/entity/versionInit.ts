import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { $Class } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

export interface IEntityOptionsVersionInit extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsVersionInit>('aVersionInit')
export class EntityVersionInit extends $Class.omit(EntityBaseSimple, ['iid', 'deleted']) {
  @Api.field()
  instanceName: string;

  @Api.field()
  module: string;

  @Api.field()
  version: number;
}
