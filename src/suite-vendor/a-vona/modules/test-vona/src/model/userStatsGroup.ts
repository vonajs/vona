import type { IDecoratorModelOptions, IModelRelationBelongsToMany, IModelRelationHasMany } from 'vona-module-a-orm';
import type { ModelRole } from './role.ts';
import type { ModelRoleUser } from './roleUser.ts';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUserStatsGroup } from '../entity/userStatsGroup.ts';
import { ModelPost } from './post.ts';

export interface IModelOptionsUserStatsGroup extends IDecoratorModelOptions {
  relations: {
    posts: IModelRelationHasMany<ModelPost, true, '*', undefined, { count?: '*' | 'title' | Array<'*' | 'title'>; sum?: 'stars' | Array<'stars'> }>;
    roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole, false, '*', undefined, { count?: '*' }>;
  };
}

@Model<IModelOptionsUserStatsGroup>({
  entity: EntityUserStatsGroup,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { autoload: true, aggrs: { count: ['*', 'title'], sum: 'stars' } }),
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { aggrs: { count: '*' } }),
  },
})
export class ModelUserStatsGroup extends BeanModelBase<EntityUserStatsGroup> {}
