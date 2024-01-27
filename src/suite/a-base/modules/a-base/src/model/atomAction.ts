import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aAtomAction',
  options: {
    disableDeleted: false,
    cacheName: { name: 'modelAtomAction' },
  },
})
export class ModelAtomAction extends BeanModelBase {}
