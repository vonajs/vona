import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityShareRecordUV } from '../entity/shareRecordUV.js';

@Model({ table: 'aShareRecordUV', options: { disableDeleted: false } })
export class ModelShareRecordUV extends BeanModelBase<EntityShareRecordUV> {}
