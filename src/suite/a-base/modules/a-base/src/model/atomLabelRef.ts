import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAtomLabelRef } from '../entity/atomLabelRef.js';

@Model({ table: 'aAtomLabelRef', disableDeleted: true })
export class ModelAtomLabelRef extends BeanModelBase<EntityAtomLabelRef> {}
