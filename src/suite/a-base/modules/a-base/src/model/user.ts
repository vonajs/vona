import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityUser } from '../entity/user.js';

@Model({
  table: 'aUser',
  options: {
    disableDeleted: false,
  },
})
export class ModelUser extends BeanModelBase<EntityUser> {}
