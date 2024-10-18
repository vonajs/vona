import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAuthSimple } from '../entity/authSimple.js';

@Model({ table: 'aAuthSimple', options: { disableDeleted: true } })
export class ModelAuthSimple extends BeanModelBase<EntityAuthSimple> {}
