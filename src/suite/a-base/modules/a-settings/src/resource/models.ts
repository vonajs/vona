export * from '../model/settings.js';
export * from '../model/settingsRef.js';

import { ModelSettings } from '../model/settings.js';
import { ModelSettingsRef } from '../model/settingsRef.js';

export interface IModuleModel {
  settings: ModelSettings;
  settingsRef: ModelSettingsRef;
}
