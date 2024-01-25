import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aCommentHeart', options: { disableDeleted: true } })
export class ModelCommentHeart extends BeanModelBase {}
