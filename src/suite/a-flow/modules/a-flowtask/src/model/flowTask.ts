import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityFlowTask } from '../entity/flowTask.js';

@Model({ entity: EntityFlowTask, disableDeleted: true })
export class ModelFlowTask extends BeanModelBase<EntityFlowTask> {}
