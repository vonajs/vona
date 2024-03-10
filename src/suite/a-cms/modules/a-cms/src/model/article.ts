import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityArticle } from '../entity/article.js';

@Model({ table: 'aCmsArticle', options: { disableDeleted: false } })
export class ModelArticle extends BeanModelBase<EntityArticle> {}
