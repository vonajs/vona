import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowNodeHistory } from '../entity/flowNodeHistory.js';

@Model({
  table: 'aFlowNodeHistory',
  disableDeleted: false,
})
export class ModelFlowNodeHistory extends BeanModelBase<EntityFlowNodeHistory> {}
