import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowNodeHistory } from '../entity/flowNodeHistory.js';

@Model({ entity: EntityFlowNodeHistory, disableDeleted: false })
export class ModelFlowNodeHistory extends BeanModelBase<EntityFlowNodeHistory> {}
