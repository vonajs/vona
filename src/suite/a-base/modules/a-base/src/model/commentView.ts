import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityCommentView } from '../entity/commentView.js';

@Model({ table: 'aViewComment', disableDeleted: false })
export class ModelCommentView extends BeanModelBase<EntityCommentView> {}
