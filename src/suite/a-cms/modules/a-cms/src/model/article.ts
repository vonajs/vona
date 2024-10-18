import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityArticle } from '../entity/article.js';

@Model({ table: 'aCmsArticle', options: { disableDeleted: false } })
export class ModelArticle extends BeanModelBase<EntityArticle> {}
