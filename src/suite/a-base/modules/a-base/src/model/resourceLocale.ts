import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityResourceLocale } from '../entity/resourceLocale.js';

@Model({ table: 'aResourceLocale', disableDeleted: true })
export class ModelResourceLocale extends BeanModelBase<EntityResourceLocale> {}
