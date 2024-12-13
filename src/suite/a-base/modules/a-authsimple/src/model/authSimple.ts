import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAuthSimple } from '../entity/authSimple.js';

@Model({ entity: EntityAuthSimple, disableDeleted: true })
export class ModelAuthSimple extends BeanModelBase<EntityAuthSimple> {}
