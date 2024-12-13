import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityMail } from '../entity/mail.js';

@Model({ entity: EntityMail, disableDeleted: false })
export class ModelMail extends BeanModelBase<EntityMail> {}
