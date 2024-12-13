import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAtomLabelRef } from '../entity/atomLabelRef.js';

@Model({ entity: EntityAtomLabelRef, disableDeleted: true })
export class ModelAtomLabelRef extends BeanModelBase<EntityAtomLabelRef> {}
