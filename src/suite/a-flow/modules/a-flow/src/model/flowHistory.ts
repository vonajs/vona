import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowHistory } from '../entity/flowHistory.js';

@Model({
  table: 'aFlowHistory',
  options: {
    disableDeleted: false,
  },
})
export class ModelFlowHistory extends BeanModelBase<EntityFlowHistory> {}
