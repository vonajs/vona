import type { IDecoratorModelOptions, IModelRelationBelongsToMany, IModelRelationHasMany } from 'vona-module-a-orm';
import type { ModelRole } from './role.ts';
import type { ModelRoleUser } from './roleUser.ts';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUserStats } from '../entity/userStats.ts';
import { ModelPost } from './post.ts';

export interface IModelOptionsUserStats extends IDecoratorModelOptions {
  relations: {
    // aggrs：需要支持宿主形式
    posts: IModelRelationHasMany<ModelPost, true, '*', undefined, { count?: '*' | 'title' | Array<'*' | 'title'>; sum?: 'stars' | Array<'stars'> }>;
    roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole, false, '*', undefined, { count?: '*' }>;
  };
}

@Model<IModelOptionsUserStats>({
  entity: EntityUserStats,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { autoload: true, aggrs: { count: ['*', 'title'], sum: 'stars' } }),
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { aggrs: { count: '*' } }),
  },
})
export class ModelUserStats extends BeanModelBase<EntityUserStats> {}
