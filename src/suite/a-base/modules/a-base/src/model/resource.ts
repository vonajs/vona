import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityResource } from '../entity/resource.js';

@Model({ table: 'aResource', options: { disableDeleted: false } })
export class ModelResource extends BeanModelBase<EntityResource> {}
