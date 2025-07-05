import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUserRole } from '../entity/userRole.ts';

export interface IModelOptionsUserRole extends IDecoratorModelOptions {}

@Model<IModelOptionsUserRole>({ entity: EntityUserRole })
export class ModelUserRole extends BeanModelBase<EntityUserRole> {}
