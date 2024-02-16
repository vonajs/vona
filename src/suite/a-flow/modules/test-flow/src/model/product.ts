import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'testFlowProduct', options: { disableDeleted: false } })
export class ModelProduct extends BeanModelBase {}
