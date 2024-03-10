import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityLayoutFull } from '../entity/layoutFull.js';

@Model({ table: 'aLayoutViewFull', options: { disableDeleted: false } })
export class ModelLayoutFull extends BeanModelBase<EntityLayoutFull> {}
