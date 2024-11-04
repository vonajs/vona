import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityUserAgent } from '../entity/userAgent.js';

@Model({ table: 'aUserAgent', disableDeleted: true })
export class ModelUserAgent extends BeanModelBase<EntityUserAgent> {}
