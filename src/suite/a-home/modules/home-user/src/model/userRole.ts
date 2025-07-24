import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUserRole } from '../entity/userRole.ts';

export interface IModelOptionsUserRole extends IDecoratorModelOptions {}

@Model<IModelOptionsUserRole>({ entity: EntityUserRole })
export class ModelUserRole extends BeanModelBase<EntityUserRole> {}
