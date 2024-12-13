import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityComment } from '../entity/comment.js';

@Model({ entity: EntityComment, disableDeleted: false })
export class ModelComment extends BeanModelBase<EntityComment> {}
