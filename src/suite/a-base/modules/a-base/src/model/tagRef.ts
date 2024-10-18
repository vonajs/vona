import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityTagRef } from '../entity/tagRef.js';

@Model({ table: 'aTagRef', options: { disableDeleted: true } })
export class ModelTagRef extends BeanModelBase<EntityTagRef> {}
