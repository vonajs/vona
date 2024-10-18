import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowTaskHistory } from '../entity/flowTaskHistory.js';

@Model({
  table: 'aFlowTaskHistory',
  options: {
    disableDeleted: false,
  },
})
export class ModelFlowTaskHistory extends BeanModelBase<EntityFlowTaskHistory> {}
