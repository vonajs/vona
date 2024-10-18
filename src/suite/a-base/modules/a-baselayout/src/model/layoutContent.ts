import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityLayoutContent } from '../entity/layoutContent.js';

@Model({ table: 'aLayoutContent', options: { disableDeleted: false } })
export class ModelLayoutContent extends BeanModelBase<EntityLayoutContent> {}
