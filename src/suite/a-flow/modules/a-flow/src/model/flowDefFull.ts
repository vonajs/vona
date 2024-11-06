import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowDefFull } from '../entity/flowDefFull.js';

@Model({ entity: EntityFlowDefFull, disableDeleted: false })
export class ModelFlowDefFull extends BeanModelBase<EntityFlowDefFull> {}
