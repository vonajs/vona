import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'testParty', options: { disableDeleted: false } })
export class ModelParty extends BeanModelBase {}
