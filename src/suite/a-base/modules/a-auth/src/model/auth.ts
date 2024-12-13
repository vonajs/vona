import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAuth } from '../entity/auth.js';

@Model({ entity: EntityAuth, disableDeleted: true })
export class ModelAuth extends BeanModelBase<EntityAuth> {}
