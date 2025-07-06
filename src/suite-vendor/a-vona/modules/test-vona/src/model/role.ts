import type { IDecoratorModelOptions, IModelRelationBelongsToMany } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRole } from '../entity/role.ts';
import { ModelRoleUser } from './roleUser.ts';
import { ModelUser } from './user.ts';

export interface IModelOptionsRole extends IDecoratorModelOptions {
  relations: {
    users: IModelRelationBelongsToMany<ModelRoleUser, ModelUser>;
  };
}

@Model<IModelOptionsRole>({
  entity: EntityRole,
  relations: {
    users: $relation.belongsToMany(() => ModelRoleUser, () => ModelUser, 'roleId', 'userId'),
  },
})
export class ModelRole extends BeanModelBase<EntityRole> {}
