import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityShareRecordUV } from '../entity/shareRecordUV.js';

@Model({ table: 'aShareRecordUV', disableDeleted: false })
export class ModelShareRecordUV extends BeanModelBase<EntityShareRecordUV> {}
