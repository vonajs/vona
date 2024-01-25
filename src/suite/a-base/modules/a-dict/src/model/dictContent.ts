import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aDictContent', options: { disableDeleted: false } })
export class ModelDictContent extends BeanModelBase {}
