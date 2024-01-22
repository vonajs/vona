import { BeanModelBase } from '@cabloy/core';

@Model({ table: 'aInstance', options: { disableDeleted: false, disableInstance: true } })
export class ModelInstance extends BeanModelBase {}
