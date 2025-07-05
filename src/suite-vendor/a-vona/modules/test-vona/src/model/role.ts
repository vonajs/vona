import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRole } from '../entity/role.ts';

export interface IModelOptionsRole extends IDecoratorModelOptions {}

@Model<IModelOptionsRole>({ entity: EntityRole })
export class ModelRole extends BeanModelBase<EntityRole> {}
