import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityResourceLocale } from '../entity/resourceLocale.js';

@Model({ table: 'aResourceLocale', options: { disableDeleted: true } })
export class ModelResourceLocale extends BeanModelBase<EntityResourceLocale> {}
