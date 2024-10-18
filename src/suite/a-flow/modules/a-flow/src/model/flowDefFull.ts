import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowDefFull } from '../entity/flowDefFull.js';

@Model({ table: 'aFlowDefViewFull', options: { disableDeleted: false } })
export class ModelFlowDefFull extends BeanModelBase<EntityFlowDefFull> {}
