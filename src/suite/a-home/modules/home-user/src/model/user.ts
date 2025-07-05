import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUser } from '../entity/user.ts';

export interface IModelOptionsUser extends IDecoratorModelOptions {}

@Model<IModelOptionsUser>({ entity: EntityUser })
export class ModelUser extends BeanModelBase<EntityUser> {}
