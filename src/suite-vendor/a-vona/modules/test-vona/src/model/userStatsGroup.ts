import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUserStatsGroup } from '../entity/userStatsGroup.ts';

export interface IModelOptionsUserStatsGroup extends IDecoratorModelOptions {}

@Model<IModelOptionsUserStatsGroup>({ entity: EntityUserStatsGroup })
export class ModelUserStatsGroup extends BeanModelBase<EntityUserStatsGroup> {}
