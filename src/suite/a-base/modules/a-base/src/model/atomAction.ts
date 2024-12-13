import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAtomAction } from '../entity/atomAction.js';

@Model({ entity: EntityAtomAction, disableDeleted: false, cacheOptions: { preset: 'allWithIgnoreNull' } })
export class ModelAtomAction extends BeanModelBase<EntityAtomAction> {}
