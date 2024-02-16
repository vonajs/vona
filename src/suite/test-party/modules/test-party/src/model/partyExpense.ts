import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'testPartyExpense',
  options: {
    disableDeleted: false,
  },
})
export class ModelPartyExpense extends BeanModelBase {}
