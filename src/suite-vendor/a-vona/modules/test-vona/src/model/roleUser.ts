import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRoleUser } from '../entity/roleUser.ts';

export interface IModelOptionsRoleUser extends IDecoratorModelOptions {}

@Model<IModelOptionsRoleUser>({ entity: EntityRoleUser })
export class ModelRoleUser extends BeanModelBase<EntityRoleUser> {}
