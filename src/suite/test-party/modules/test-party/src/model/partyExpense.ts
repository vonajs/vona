import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityPartyExpense } from '../entity/partyExpense.js';

@Model({
  table: 'testPartyExpense',
  disableDeleted: false,
})
export class ModelPartyExpense extends BeanModelBase<EntityPartyExpense> {}
