import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Entity, EntityBase } from 'vona-module-a-orm';

export interface IEntityOptionsMail extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsMail>('mail')
export class EntityMail extends EntityBase {
  // provider:
}
