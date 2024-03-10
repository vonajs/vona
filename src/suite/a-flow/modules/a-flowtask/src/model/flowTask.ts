import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowTask } from '../entity/flowTask.js';

@Model({
  table: 'aFlowTask',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlowTask extends BeanModelBase<EntityFlowTask> {}
