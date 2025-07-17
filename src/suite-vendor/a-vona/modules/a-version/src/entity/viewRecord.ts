import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { $Class } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

export interface IEntityOptionsViewRecord extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsViewRecord>('aViewRecord')
export class EntityViewRecord extends $Class.omit(EntityBaseSimple, ['iid']) {
  @Api.field()
  viewName: string;

  @Api.field()
  viewSql: string;
}
