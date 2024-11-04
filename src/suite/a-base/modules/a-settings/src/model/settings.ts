import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntitySettings } from '../entity/settings.js';

@Model({ table: 'aSettings', disableDeleted: true })
export class ModelSettings extends BeanModelBase<EntitySettings> {}
