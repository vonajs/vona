import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityParty } from '../entity/party.js';

@Model({ table: 'testParty', options: { disableDeleted: false } })
export class ModelParty extends BeanModelBase<EntityParty> {}
