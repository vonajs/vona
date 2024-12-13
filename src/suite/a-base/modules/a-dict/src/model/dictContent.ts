import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityDictContent } from '../entity/dictContent.js';

@Model({ entity: EntityDictContent, disableDeleted: false })
export class ModelDictContent extends BeanModelBase<EntityDictContent> {}
