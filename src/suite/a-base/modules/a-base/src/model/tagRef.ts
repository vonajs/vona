import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityTagRef } from '../entity/tagRef.js';

@Model({ table: 'aTagRef', options: { disableDeleted: true } })
export class ModelTagRef extends BeanModelBase<EntityTagRef> {}
