import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityLayout } from '../entity/layout.js';

@Model({ entity: EntityLayout, disableDeleted: false })
export class ModelLayout extends BeanModelBase<EntityLayout> {}
