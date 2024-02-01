import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aUser',
  options: {
    disableDeleted: false,
  },
})
export class ModelUser extends BeanModelBase {}
