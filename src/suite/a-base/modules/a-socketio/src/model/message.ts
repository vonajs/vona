import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityMessage } from '../entity/message.js';

@Model({ entity: EntityMessage, disableDeleted: false })
export class ModelMessage extends BeanModelBase<EntityMessage> {}
