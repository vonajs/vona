import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityShareRecordPV } from '../entity/shareRecordPV.js';

@Model({ table: 'aShareRecordPV', options: { disableDeleted: false } })
export class ModelShareRecordPV extends BeanModelBase<EntityShareRecordPV> {}
