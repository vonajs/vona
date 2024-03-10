import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowNodeStartEventAtomCondition } from '../entity/flowNodeStartEventAtomCondition.js';

@Model({ table: 'aFlowNodeStartEventAtomCondition', options: { disableDeleted: true } })
export class ModelFlowNodeStartEventAtomCondition extends BeanModelBase<EntityFlowNodeStartEventAtomCondition> {}
