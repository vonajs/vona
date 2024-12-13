import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUser } from '../entity/user.js';

@Model({ entity: EntityUser, disableDeleted: false, cacheOptions: { preset: 'all' } })
export class ModelUser extends BeanModelBase<EntityUser> {}
