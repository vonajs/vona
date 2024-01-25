import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aApp', options: { disableDeleted: false } })
export class ModelApp extends BeanModelBase {}
