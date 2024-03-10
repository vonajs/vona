import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityPartyExpense } from '../entity/partyExpense.js';

@Model({
  table: 'testPartyExpense',
  options: {
    disableDeleted: false,
  },
})
export class ModelPartyExpense extends BeanModelBase<EntityPartyExpense> {}
