import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { $Class } from 'vona';
import { Entity, EntityBaseSimple } from 'vona-module-a-orm';
import { Api } from 'vona-module-a-openapi';

export interface IEntityOptionsViewRecord extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsViewRecord>('aViewRecord')
export class EntityViewRecord extends $Class.omit(EntityBaseSimple, ['iid']) {
  @Api.field()
  viewName: string;

  @Api.field()
  viewSql: string;
}
