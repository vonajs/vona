import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import { Entity } from 'vona-module-a-orm';
import { EntityUser } from './user.ts';

export interface IEntityOptionsUserStats extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsUserStats>('testVonaUser')
export class EntityUserStats extends EntityUser {}
