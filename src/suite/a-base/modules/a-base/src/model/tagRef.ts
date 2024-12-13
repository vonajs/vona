import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityTagRef } from '../entity/tagRef.js';

@Model({ entity: EntityTagRef, disableDeleted: true })
export class ModelTagRef extends BeanModelBase<EntityTagRef> {}
