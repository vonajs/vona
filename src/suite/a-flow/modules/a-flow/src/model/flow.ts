import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityFlow } from '../entity/flow.js';

@Model({ entity: EntityFlow, disableDeleted: true })
export class ModelFlow extends BeanModelBase<EntityFlow> {}
