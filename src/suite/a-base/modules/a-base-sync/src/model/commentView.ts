import { BeanModelBase, Model } from '@cabloy/core';

@Model({ table: 'aViewComment', options: { disableDeleted: false } })
export class ModelCommentView extends BeanModelBase {}
