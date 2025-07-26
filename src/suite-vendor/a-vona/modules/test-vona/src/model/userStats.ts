import type { IDecoratorModelOptions, IModelRelationBelongsToMany, IModelRelationHasMany } from 'vona-module-a-orm';
import type { ModelRole } from './role.ts';
import type { ModelRoleUser } from './roleUser.ts';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUserStats } from '../entity/userStats.ts';
import { ModelPost } from './post.ts';

export interface IModelOptionsUserStats extends IDecoratorModelOptions {
  relations: {
    posts: IModelRelationHasMany<ModelPost, true, '*', undefined, { count: '*' | 'title' }>;
    roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole, false, '*', undefined, { count: '*' }>;
  };
}

@Model<IModelOptionsUserStats>({
  entity: EntityUserStats,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { aggrs: { count: ['*', 'title'] } }),
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { aggrs: { count: '*' } }),
  },
})
export class ModelUserStats extends BeanModelBase<EntityUserStats> {}
