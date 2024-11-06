import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntitySettingsRef } from '../entity/settingsRef.js';

@Model({ entity: EntitySettingsRef, disableDeleted: true })
export class ModelSettingsRef extends BeanModelBase<EntitySettingsRef> {}
