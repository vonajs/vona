import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDetailBase } from '../entity/detailBase.js';

@Model({ table: 'aDetailBase', options: { disableDeleted: false } })
export class ModelDetailBase extends BeanModelBase<EntityDetailBase> {}
