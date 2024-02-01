import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aAtomAction',
  options: {
    disableDeleted: false,
  },
})
export class ModelAtomAction extends BeanModelBase {}
