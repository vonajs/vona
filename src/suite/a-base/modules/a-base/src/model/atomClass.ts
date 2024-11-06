import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAtomClass } from '../entity/atomClass.js';

@Model({ entity: EntityAtomClass, disableDeleted: false })
export class ModelAtomClass extends BeanModelBase<EntityAtomClass> {}
