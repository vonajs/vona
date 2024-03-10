import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityRoleExpand } from '../entity/roleExpand.js';

@Model({ table: 'aRoleExpand', options: { disableDeleted: true } })
export class ModelRoleExpand extends BeanModelBase<EntityRoleExpand> {}
