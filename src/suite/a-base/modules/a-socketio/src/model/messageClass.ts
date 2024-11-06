import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityMessageClass } from '../entity/messageClass.js';

@Model({ entity: EntityMessageClass, disableDeleted: false })
export class ModelMessageClass extends BeanModelBase<EntityMessageClass> {}
