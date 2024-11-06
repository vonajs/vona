import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityCommentView } from '../entity/commentView.js';

@Model({ entity: EntityCommentView, disableDeleted: false })
export class ModelCommentView extends BeanModelBase<EntityCommentView> {}
