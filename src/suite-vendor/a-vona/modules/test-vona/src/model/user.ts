import type { IDecoratorModelOptions, IModelRelationBelongsToMany, IModelRelationHasMany } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUser } from '../entity/user.ts';
import { ModelPost } from './post.ts';
import { ModelRole } from './role.ts';
import { ModelRoleUser } from './roleUser.ts';

export interface IModelOptionsUser extends IDecoratorModelOptions {
  relations: {
    posts: IModelRelationHasMany<ModelPost, false, 'id' | 'title'>;
    roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole, false, 'id' | 'name'>;
  };
}

@Model<IModelOptionsUser>({
  entity: EntityUser,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId', { columns: ['id', 'title'] }),
    roles: $relation.belongsToMany('test-vona:roleUser', 'test-vona:role', 'userId', 'roleId', { columns: ['id', 'name'] }),
  },
})
export class ModelUser extends BeanModelBase<EntityUser> {}
