import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAtomLabelRef } from '../entity/atomLabelRef.js';

@Model({ table: 'aAtomLabelRef', options: { disableDeleted: true } })
export class ModelAtomLabelRef extends BeanModelBase<EntityAtomLabelRef> {}
