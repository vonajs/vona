import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityInstance } from '../entity/instance.js';

@Model({ entity: EntityInstance, disableDeleted: false, disableInstance: true })
export class ModelInstance extends BeanModelBase<EntityInstance> {}
