import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityContent } from '../entity/content.js';

@Model({ table: 'aCmsContent', options: { disableDeleted: false } })
export class ModelContent extends BeanModelBase<EntityContent> {}
