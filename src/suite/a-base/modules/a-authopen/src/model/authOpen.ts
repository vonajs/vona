import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAuthOpen } from '../entity/authOpen.js';

@Model({ table: 'aAuthOpen', options: { disableDeleted: false } })
export class ModelAuthOpen extends BeanModelBase<EntityAuthOpen> {}
