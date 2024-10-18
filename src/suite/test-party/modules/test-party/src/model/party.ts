import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityParty } from '../entity/party.js';

@Model({ table: 'testParty', options: { disableDeleted: false } })
export class ModelParty extends BeanModelBase<EntityParty> {}
