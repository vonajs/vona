import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityShareRecordPV } from '../entity/shareRecordPV.js';

@Model({ entity: EntityShareRecordPV, disableDeleted: false })
export class ModelShareRecordPV extends BeanModelBase<EntityShareRecordPV> {}
