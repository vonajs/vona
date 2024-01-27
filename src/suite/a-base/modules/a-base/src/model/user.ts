import { BeanModelBase, Model } from '@cabloy/core';

@Model({
  table: 'aUser',
  options: {
    disableDeleted: false,
    cacheName: { name: 'modelUser' },
  },
})
export class ModelUser extends BeanModelBase {}
