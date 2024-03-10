import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityLabel } from '../entity/label.js';

@Model({
  table: 'aLabel',
  options: {
    disableDeleted: true,
  },
})
export class ModelLabel extends BeanModelBase<EntityLabel> {}
