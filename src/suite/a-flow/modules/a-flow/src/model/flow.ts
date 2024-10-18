import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlow } from '../entity/flow.js';

@Model({
  table: 'aFlow',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlow extends BeanModelBase<EntityFlow> {}
