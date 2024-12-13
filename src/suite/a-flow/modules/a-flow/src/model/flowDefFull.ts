import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityFlowDefFull } from '../entity/flowDefFull.js';

@Model({ entity: EntityFlowDefFull, disableDeleted: false })
export class ModelFlowDefFull extends BeanModelBase<EntityFlowDefFull> {}
