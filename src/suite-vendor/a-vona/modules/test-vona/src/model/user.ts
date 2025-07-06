import type { IDecoratorModelOptions, IModelRelationBelongsToMany, IModelRelationHasMany } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUser } from '../entity/user.ts';
import { ModelPost } from './post.ts';
import { ModelRole } from './role.ts';
import { ModelRoleUser } from './roleUser.ts';

export interface IModelOptionsUser extends IDecoratorModelOptions {
  relations: {
    posts: IModelRelationHasMany<ModelPost>;
    roles: IModelRelationBelongsToMany<ModelRoleUser, ModelRole>;
  };
}

@Model<IModelOptionsUser>({
  entity: EntityUser,
  relations: {
    posts: $relation.hasMany(() => ModelPost, 'userId'),
    roles: $relation.belongsToMany(() => ModelRoleUser, () => ModelRole, 'userId', 'roleId'),
  },
})
export class ModelUser extends BeanModelBase<EntityUser> {}
