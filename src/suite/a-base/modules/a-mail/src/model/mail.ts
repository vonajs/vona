import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityMail } from '../entity/mail.js';

@Model({ table: 'aMail', options: { disableDeleted: false } })
export class ModelMail extends BeanModelBase<EntityMail> {}
