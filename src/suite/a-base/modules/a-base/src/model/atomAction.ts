import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAtomAction } from '../entity/atomAction.js';

@Model({
  table: 'aAtomAction',
  options: {
    disableDeleted: false,
  },
})
export class ModelAtomAction extends BeanModelBase<EntityAtomAction> {}
