import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowHistory } from '../entity/flowHistory.js';

@Model({ entity: EntityFlowHistory, disableDeleted: false })
export class ModelFlowHistory extends BeanModelBase<EntityFlowHistory> {}
