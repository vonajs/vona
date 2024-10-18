import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityContent } from '../entity/content.js';

@Model({ table: 'aCmsContent', options: { disableDeleted: false } })
export class ModelContent extends BeanModelBase<EntityContent> {}
