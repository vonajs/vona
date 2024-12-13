import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityLayoutContent } from '../entity/layoutContent.js';

@Model({ entity: EntityLayoutContent, disableDeleted: false })
export class ModelLayoutContent extends BeanModelBase<EntityLayoutContent> {}
