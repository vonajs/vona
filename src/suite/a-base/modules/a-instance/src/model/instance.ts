import { Model } from '@cabloy/core';
import { BeanModel } from 'cabloy-module-api-a-database';
import { EntityInstance } from '../entity/instance.js';

@Model({ table: 'aInstance', options: { disableDeleted: false, disableInstance: true } })
export class ModelInstance extends BeanModel<EntityInstance> {}
