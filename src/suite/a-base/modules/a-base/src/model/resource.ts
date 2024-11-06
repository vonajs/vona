import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityResource } from '../entity/resource.js';

@Model({ entity: EntityResource, disableDeleted: false })
export class ModelResource extends BeanModelBase<EntityResource> {}
