import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUser } from '../entity/user.ts';
import { ModelPost } from './post.ts';
import { ModelUserStats } from './userStats.ts';

export interface IModelOptionsUser extends IDecoratorModelOptions {}

@Model<IModelOptionsUser>({
  entity: EntityUser,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { columns: ['id', 'title'] }),
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { columns: ['id', 'name'] }),
  },
  cache: {
    modelsClear: () => ModelUserStats,
  },
})
export class ModelUser extends BeanModelBase<EntityUser> {}
