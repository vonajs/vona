import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlow } from '../entity/flow.js';

@Model({
  table: 'aFlow',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlow extends BeanModelBase<EntityFlow> {}
