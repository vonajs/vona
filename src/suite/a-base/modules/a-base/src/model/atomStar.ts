import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAtomStar } from '../entity/atomStar.js';

@Model({ table: 'aAtomStar', options: { disableDeleted: true } })
export class ModelAtomStar extends BeanModelBase<EntityAtomStar> {}
