import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUser } from '../entity/user.ts';
import { ModelPost } from './post.ts';

export interface IModelOptionsUser extends IDecoratorModelOptions<'posts'> {}

@Model<IModelOptionsUser>({
  entity: EntityUser,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId'),
  },
})
export class ModelUser extends BeanModelBase<EntityUser> {}
