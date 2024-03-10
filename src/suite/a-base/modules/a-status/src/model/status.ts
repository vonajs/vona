import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityStatus } from '../entity/status.js';

@Model({
  table: 'aStatus',
  options: {
    disableDeleted: true,
  },
})
export class ModelStatus extends BeanModelBase<EntityStatus> {}
