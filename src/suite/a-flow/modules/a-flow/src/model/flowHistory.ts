import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityFlowHistory } from '../entity/flowHistory.js';

@Model({ entity: EntityFlowHistory, disableDeleted: false })
export class ModelFlowHistory extends BeanModelBase<EntityFlowHistory> {}
