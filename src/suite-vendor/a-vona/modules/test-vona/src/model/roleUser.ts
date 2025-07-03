import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityRoleUser } from '../entity/roleUser.ts';

@Model({ entity: EntityRoleUser })
export class ModelRoleUser extends BeanModelBase<EntityRoleUser> {}
