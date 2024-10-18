import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowDef } from '../entity/flowDef.js';

@Model({ table: 'aFlowDef', options: { disableDeleted: false } })
export class ModelFlowDef extends BeanModelBase<EntityFlowDef> {}
