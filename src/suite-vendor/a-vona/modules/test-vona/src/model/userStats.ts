import type { IDecoratorModelOptions, IModelRelationBelongsToMany, IModelRelationHasMany } from 'vona-module-a-orm';
import type { ModelRole } from './role.ts';
import type { ModelRoleUser } from './roleUser.ts';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUserStats } from '../entity/userStats.ts';
import { ModelPost } from './post.ts';

export interface IModelOptionsUserStats extends IDecoratorModelOptions {
  relations: {
    posts: IModelRelationHasMany<ModelPost, false, 'id' | 'title'>;
    roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole, false, 'id' | 'name'>;
  };
}

@Model<IModelOptionsUserStats>({
  entity: EntityUserStats,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { columns: ['id', 'title'] }),
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { columns: ['id', 'name'] }),
  },
})
export class ModelUserStats extends BeanModelBase<EntityUserStats> {}
