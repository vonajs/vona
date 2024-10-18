import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityCommentView } from '../entity/commentView.js';

@Model({ table: 'aViewComment', options: { disableDeleted: false } })
export class ModelCommentView extends BeanModelBase<EntityCommentView> {}
