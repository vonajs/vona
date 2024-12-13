import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityFlowDef } from '../entity/flowDef.js';

@Model({ entity: EntityFlowDef, disableDeleted: false })
export class ModelFlowDef extends BeanModelBase<EntityFlowDef> {}
