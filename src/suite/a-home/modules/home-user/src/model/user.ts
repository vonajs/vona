import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUser } from '../entity/user.ts';

export interface IModelOptionsUser extends IDecoratorModelOptions {}

@Model<IModelOptionsUser>({ entity: EntityUser })
export class ModelUser extends BeanModelBase<EntityUser> {}
