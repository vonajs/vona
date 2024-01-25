import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aCmsArticle', options: { disableDeleted: false } })
export class ModelArticle extends BeanModelBase {}
