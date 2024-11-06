import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowTaskHistory } from '../entity/flowTaskHistory.js';

@Model({ entity: EntityFlowTaskHistory, disableDeleted: false })
export class ModelFlowTaskHistory extends BeanModelBase<EntityFlowTaskHistory> {}
