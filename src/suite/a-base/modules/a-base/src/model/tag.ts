import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityTag } from '../entity/tag.js';

@Model({ entity: EntityTag, disableDeleted: false })
export class ModelTag extends BeanModelBase<EntityTag> {}
