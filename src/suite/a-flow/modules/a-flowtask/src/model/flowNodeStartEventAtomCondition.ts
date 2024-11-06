import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowNodeStartEventAtomCondition } from '../entity/flowNodeStartEventAtomCondition.js';

@Model({ entity: EntityFlowNodeStartEventAtomCondition, disableDeleted: true })
export class ModelFlowNodeStartEventAtomCondition extends BeanModelBase<EntityFlowNodeStartEventAtomCondition> {}
