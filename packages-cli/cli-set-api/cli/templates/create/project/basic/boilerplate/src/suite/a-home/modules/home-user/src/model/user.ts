import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUser } from '../entity/user.ts';

@Model({ entity: EntityUser })
export class ModelUser extends BeanModelBase<EntityUser> {}
