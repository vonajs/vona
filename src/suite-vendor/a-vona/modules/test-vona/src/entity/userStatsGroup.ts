import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Entity, EntityBase } from 'vona-module-a-orm';

export interface IEntityOptionsUserStatsGroup extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUserStatsGroup>('testVonaUser')
export class EntityUserStatsGroup extends EntityBase {}
