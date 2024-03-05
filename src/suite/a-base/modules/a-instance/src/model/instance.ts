import { Model } from '@cabloy/core';
import { BeanModel } from 'cabloy-module-api-a-database';

@Model({ table: 'aInstance', options: { disableDeleted: false, disableInstance: true } })
export class ModelInstance extends BeanModel {}
