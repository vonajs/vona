import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAtomLabel } from '../entity/atomLabel.js';

@Model({ table: 'aAtomLabel', options: { disableDeleted: true } })
export class ModelAtomLabel extends BeanModelBase<EntityAtomLabel> {}
