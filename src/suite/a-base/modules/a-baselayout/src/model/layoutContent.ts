import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityLayoutContent } from '../entity/layoutContent.js';

@Model({ table: 'aLayoutContent', options: { disableDeleted: false } })
export class ModelLayoutContent extends BeanModelBase<EntityLayoutContent> {}
