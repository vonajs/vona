import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityDetailBase } from '../entity/detailBase.js';

@Model({ table: 'aDetailBase', options: { disableDeleted: false } })
export class ModelDetailBase extends BeanModelBase<EntityDetailBase> {}
