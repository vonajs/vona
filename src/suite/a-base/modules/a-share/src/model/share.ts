import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityShare } from '../entity/share.js';

@Model({ table: 'aShare', disableDeleted: false })
export class ModelShare extends BeanModelBase<EntityShare> {}
