import { Model } from 'vona';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntitySettings } from '../entity/settings.js';

@Model({ table: 'aSettings', options: { disableDeleted: true } })
export class ModelSettings extends BeanModelBase<EntitySettings> {}
