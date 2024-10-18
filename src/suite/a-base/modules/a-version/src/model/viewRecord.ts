import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityViewRecord } from '../entity/viewRecord.js';

@Model({ table: 'aViewRecord', options: { disableDeleted: false, disableInstance: true } })
export class ModelViewRecord extends BeanModelBase<EntityViewRecord> {}
