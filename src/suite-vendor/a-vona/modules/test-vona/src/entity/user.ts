import type { IDecoratorEntityOptions } from 'vona-module-a-database';
import { Entity, EntityBase } from 'vona-module-a-database';

export interface IEntityOptionsUser extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUser>('testVonaUser')
export class EntityUser extends EntityBase {}
