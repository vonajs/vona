import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityShare } from '../entity/share.js';

@Model({ table: 'aShare', options: { disableDeleted: false } })
export class ModelShare extends BeanModelBase<EntityShare> {}
