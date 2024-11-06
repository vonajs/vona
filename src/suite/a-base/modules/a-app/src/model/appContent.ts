import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAppContent } from '../entity/appContent.js';

@Model({ entity: EntityAppContent, disableDeleted: false })
export class ModelAppContent extends BeanModelBase<EntityAppContent> {}
