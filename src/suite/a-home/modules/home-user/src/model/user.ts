import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUser } from '../entity/user.ts';
import { ModelRole } from './role.ts';
import { ModelRoleUser } from './roleUser.ts';

export interface IModelOptionsUser extends IDecoratorModelOptions {}

@Model<IModelOptionsUser>({
  entity: EntityUser,
  relations: {
    roles: $relation.belongsToMany(() => ModelRoleUser, () => ModelRole, 'userId', 'roleId', { columns: ['id', 'name'] }),
  },
})
export class ModelUser extends BeanModelBase<EntityUser> {}
