import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityRole } from '../entity/role.js';

@Model({
  table: 'aRole',
  options: {
    disableDeleted: true,
  },
})
export class ModelRole extends BeanModelBase<EntityRole> {}
