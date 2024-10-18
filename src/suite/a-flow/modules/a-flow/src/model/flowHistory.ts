import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowHistory } from '../entity/flowHistory.js';

@Model({
  table: 'aFlowHistory',
  options: {
    disableDeleted: false,
  },
})
export class ModelFlowHistory extends BeanModelBase<EntityFlowHistory> {}
