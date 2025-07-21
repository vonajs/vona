import type { IDecoratorModelOptions, IModelRelationBelongsToMany } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRole } from '../entity/role.ts';
import { ModelRoleUser } from './roleUser.ts';
import { ModelUser } from './user.ts';

export interface IModelOptionsRole extends IDecoratorModelOptions {
  relations: {
    users: IModelRelationBelongsToMany<ModelRoleUser, ModelUser, false, 'id' | 'name'>;
  };
}

@Model<IModelOptionsRole>({
  entity: EntityRole,
  relations: {
    users: $relation.belongsToMany(() => ModelRoleUser, () => ModelUser, 'roleId', 'userId', { columns: ['id', 'name'] }),
  },
})
export class ModelRole extends BeanModelBase<EntityRole> {}
