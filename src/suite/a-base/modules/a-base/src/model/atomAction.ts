import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAtomAction } from '../entity/atomAction.js';

@Model({
  table: 'aAtomAction',
  options: {
    disableDeleted: false,
  },
})
export class ModelAtomAction extends BeanModelBase<EntityAtomAction> {}
