import type { IDecoratorModelOptions, IModelRelationBelongsToMany, IModelRelationHasMany } from 'vona-module-a-orm';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUser } from '../entity/user.ts';
import { ModelPost } from './post.ts';
import { ModelRole } from './role.ts';
import { ModelRoleUser } from './roleUser.ts';
import { ModelUserStats } from './userStats.ts';

export interface IModelOptionsUser extends IDecoratorModelOptions {
  relations: {
    posts: IModelRelationHasMany<ModelPost, false, '*', undefined, { count: '*' | 'title' }>;
    roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole, false, '*', undefined, { count: '*' }>;
  };
}

@Model<IModelOptionsUser>({
  entity: EntityUser,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { aggrs: { count: ['*', 'title'] } }),
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { aggrs: { count: '*' } }),
  },
  cache: {
    modelsClear: () => ModelUserStats,
  },
})
export class ModelUser extends BeanModelBase<EntityUser> {}
