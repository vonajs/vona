import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAtomAction } from '../entity/atomAction.js';

@Model({ entity: EntityAtomAction, disableDeleted: false, cacheOptions: { preset: 'allWithIgnoreNull' } })
export class ModelAtomAction extends BeanModelBase<EntityAtomAction> {}
