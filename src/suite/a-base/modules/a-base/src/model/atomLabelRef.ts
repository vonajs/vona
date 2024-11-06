import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAtomLabelRef } from '../entity/atomLabelRef.js';

@Model({ entity: EntityAtomLabelRef, disableDeleted: true })
export class ModelAtomLabelRef extends BeanModelBase<EntityAtomLabelRef> {}
