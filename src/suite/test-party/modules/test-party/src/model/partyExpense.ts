import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPartyExpense } from '../entity/partyExpense.js';

@Model({ entity: EntityPartyExpense, disableDeleted: false })
export class ModelPartyExpense extends BeanModelBase<EntityPartyExpense> {}
