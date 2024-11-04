import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityShareRecordPV } from '../entity/shareRecordPV.js';

@Model({ table: 'aShareRecordPV', disableDeleted: false })
export class ModelShareRecordPV extends BeanModelBase<EntityShareRecordPV> {}
