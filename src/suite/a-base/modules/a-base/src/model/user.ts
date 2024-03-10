import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityUser } from '../entity/user.js';

@Model({
  table: 'aUser',
  options: {
    disableDeleted: false,
  },
})
export class ModelUser extends BeanModelBase<EntityUser> {}
