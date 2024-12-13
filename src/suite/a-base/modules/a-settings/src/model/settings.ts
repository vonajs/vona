import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntitySettings } from '../entity/settings.js';

@Model({ entity: EntitySettings, disableDeleted: true })
export class ModelSettings extends BeanModelBase<EntitySettings> {}
