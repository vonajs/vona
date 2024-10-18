import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowTask } from '../entity/flowTask.js';

@Model({
  table: 'aFlowTask',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlowTask extends BeanModelBase<EntityFlowTask> {}
