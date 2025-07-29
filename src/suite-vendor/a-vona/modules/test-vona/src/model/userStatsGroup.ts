import type { IDecoratorModelOptions, IModelRelationBelongsToMany, IModelRelationHasMany } from 'vona-module-a-orm';
import type { ModelRole } from './role.ts';
import type { ModelRoleUser } from './roleUser.ts';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUser } from '../entity/user.ts';
import { ModelPost } from './post.ts';

export interface IModelOptionsUserStatsGroup extends IDecoratorModelOptions {
  relations: {
    // columns：默认为undefined
    posts: IModelRelationHasMany<ModelPost, true, undefined, undefined, { count?: '*' | 'title' | Array<'*' | 'title'>; sum?: 'stars' | Array<'stars'> }, 'title' | Array<'title'>>;
    roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole, false, undefined, undefined, { count?: '*' }, 'name'>;
  };
}

@Model<IModelOptionsUserStatsGroup>({
  entity: EntityUser,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { autoload: true, groups: ['title'], aggrs: { count: ['*', 'title'], sum: 'stars' }, orders: [['title', 'desc']] }, undefined, true),
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { groups: ['name'], aggrs: { count: '*' }, orders: [['name', 'asc']] }, undefined, true),
  },
})
export class ModelUserStatsGroup extends BeanModelBase<EntityUser> {}
