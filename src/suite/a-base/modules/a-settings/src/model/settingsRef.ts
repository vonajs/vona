import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntitySettingsRef } from '../entity/settingsRef.js';

@Model({ table: 'aSettingsRef', options: { disableDeleted: true } })
export class ModelSettingsRef extends BeanModelBase<EntitySettingsRef> {}
