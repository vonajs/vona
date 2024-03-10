import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowDef } from '../entity/flowDef.js';

@Model({ table: 'aFlowDef', options: { disableDeleted: false } })
export class ModelFlowDef extends BeanModelBase<EntityFlowDef> {}
