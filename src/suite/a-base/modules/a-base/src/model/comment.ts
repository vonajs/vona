import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityComment } from '../entity/comment.js';

@Model({ table: 'aComment', options: { disableDeleted: false } })
export class ModelComment extends BeanModelBase<EntityComment> {}
