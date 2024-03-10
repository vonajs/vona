import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAuth } from '../entity/auth.js';

@Model({ table: 'aAuth', options: { disableDeleted: true } })
export class ModelAuth extends BeanModelBase<EntityAuth> {}
