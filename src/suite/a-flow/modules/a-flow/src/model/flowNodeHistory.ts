import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowNodeHistory } from '../entity/flowNodeHistory.js';

@Model({
  table: 'aFlowNodeHistory',
  options: {
    disableDeleted: false,
  },
})
export class ModelFlowNodeHistory extends BeanModelBase<EntityFlowNodeHistory> {}
