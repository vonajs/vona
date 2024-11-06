import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDetailBase } from '../entity/detailBase.js';

@Model({ entity: EntityDetailBase, disableDeleted: false })
export class ModelDetailBase extends BeanModelBase<EntityDetailBase> {}
