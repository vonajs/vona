import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityViewRecord } from '../entity/viewRecord.js';

@Model({ entity: EntityViewRecord, disableDeleted: false, disableInstance: true })
export class ModelViewRecord extends BeanModelBase<EntityViewRecord> {}
