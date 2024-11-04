import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityMessage } from '../entity/message.js';

@Model({ table: 'aSocketIOMessage', disableDeleted: false })
export class ModelMessage extends BeanModelBase<EntityMessage> {}
