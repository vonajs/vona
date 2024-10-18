import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityCommentHeart } from '../entity/commentHeart.js';

@Model({ table: 'aCommentHeart', options: { disableDeleted: true } })
export class ModelCommentHeart extends BeanModelBase<EntityCommentHeart> {}
