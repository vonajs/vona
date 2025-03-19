import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUser } from '../entity/user.ts';

@Model({ entity: EntityUser })
export class ModelUser extends BeanModelBase<EntityUser> {}
