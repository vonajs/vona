import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityViewRecord } from '../entity/viewRecord.js';

@Model({ entity: EntityViewRecord, disableDeleted: false, disableInstance: true })
export class ModelViewRecord extends BeanModelBase<EntityViewRecord> {}
