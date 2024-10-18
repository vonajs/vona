import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityMessage } from '../entity/message.js';

@Model({ table: 'aSocketIOMessage', options: { disableDeleted: false } })
export class ModelMessage extends BeanModelBase<EntityMessage> {}
