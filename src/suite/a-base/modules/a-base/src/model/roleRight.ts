import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityRoleRight } from '../entity/roleRight.js';

@Model({ table: 'aRoleRight', options: { disableDeleted: true } })
export class ModelRoleRight extends BeanModelBase<EntityRoleRight> {}
