import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowHistory } from '../entity/flowHistory.js';

@Model({
  table: 'aFlowHistory',
  options: {
    disableDeleted: false,
  },
})
export class ModelFlowHistory extends BeanModelBase<EntityFlowHistory> {}
