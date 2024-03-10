import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAuthProvider } from '../entity/authProvider.js';

@Model({ table: 'aAuthProvider', options: { disableDeleted: true } })
export class ModelAuthProvider extends BeanModelBase<EntityAuthProvider> {}
