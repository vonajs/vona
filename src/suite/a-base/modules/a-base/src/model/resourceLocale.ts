import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityResourceLocale } from '../entity/resourceLocale.js';

@Model({ entity: EntityResourceLocale, disableDeleted: true })
export class ModelResourceLocale extends BeanModelBase<EntityResourceLocale> {}
