import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityUserAgent } from '../entity/userAgent.js';

@Model({ entity: EntityUserAgent, disableDeleted: true })
export class ModelUserAgent extends BeanModelBase<EntityUserAgent> {}
