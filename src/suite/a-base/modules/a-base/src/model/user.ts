import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUser } from '../entity/user.js';

@Model({
  table: 'aUser',
  disableDeleted: false,
})
export class ModelUser extends BeanModelBase<EntityUser> {}
