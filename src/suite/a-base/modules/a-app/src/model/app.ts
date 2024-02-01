import { BeanModelBase, Model } from '@cabloy/core';

@Model({ name: '_app', table: 'aApp', options: { disableDeleted: false } })
export class ModelApp extends BeanModelBase {}
