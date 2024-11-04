import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityCommentHeart } from '../entity/commentHeart.js';

@Model({ table: 'aCommentHeart', disableDeleted: true })
export class ModelCommentHeart extends BeanModelBase<EntityCommentHeart> {}
