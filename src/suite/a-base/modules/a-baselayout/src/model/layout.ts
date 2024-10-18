import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityLayout } from '../entity/layout.js';

@Model({ table: 'aLayout', options: { disableDeleted: false } })
export class ModelLayout extends BeanModelBase<EntityLayout> {}
