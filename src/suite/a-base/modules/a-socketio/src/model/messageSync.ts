import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityMessageSync } from '../entity/messageSync.js';

@Model({ table: 'aSocketIOMessageSync', options: { disableDeleted: false } })
export class ModelMessageSync extends BeanModelBase<EntityMessageSync> {}
