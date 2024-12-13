import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityParty } from '../entity/party.js';

@Model({ entity: EntityParty, disableDeleted: false })
export class ModelParty extends BeanModelBase<EntityParty> {}
