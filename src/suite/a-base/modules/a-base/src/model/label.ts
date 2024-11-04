import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityLabel } from '../entity/label.js';

@Model({
  table: 'aLabel',
  disableDeleted: true,
})
export class ModelLabel extends BeanModelBase<EntityLabel> {}
