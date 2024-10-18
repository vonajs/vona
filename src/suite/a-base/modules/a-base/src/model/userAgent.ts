import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityUserAgent } from '../entity/userAgent.js';

@Model({ table: 'aUserAgent', options: { disableDeleted: true } })
export class ModelUserAgent extends BeanModelBase<EntityUserAgent> {}
