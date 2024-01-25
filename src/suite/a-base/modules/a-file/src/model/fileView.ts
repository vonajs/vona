import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aViewFile', options: { disableDeleted: false } })
export class ModelFileView extends BeanModelBase {}
