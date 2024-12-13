import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityContent } from '../entity/content.js';

@Model({ entity: EntityContent, disableDeleted: false })
export class ModelContent extends BeanModelBase<EntityContent> {}
