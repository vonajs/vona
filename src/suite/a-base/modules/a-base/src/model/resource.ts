import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityResource } from '../entity/resource.js';

@Model({ entity: EntityResource, disableDeleted: false })
export class ModelResource extends BeanModelBase<EntityResource> {}
