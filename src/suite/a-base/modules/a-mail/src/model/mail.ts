import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityMail } from '../entity/mail.js';

@Model({ table: 'aMail', options: { disableDeleted: false } })
export class ModelMail extends BeanModelBase<EntityMail> {}
