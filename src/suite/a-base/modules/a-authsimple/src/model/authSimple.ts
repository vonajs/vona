import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAuthSimple } from '../entity/authSimple.js';

@Model({ table: 'aAuthSimple', disableDeleted: true })
export class ModelAuthSimple extends BeanModelBase<EntityAuthSimple> {}
