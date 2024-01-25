import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aFlowDef', options: { disableDeleted: false } })
export class ModelFlowDef extends BeanModelBase {}
