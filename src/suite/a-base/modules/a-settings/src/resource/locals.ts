export * from '../local/settings.js';

import { LocalSettings } from '../local/settings.js';

export interface IModuleService {
  settings: LocalSettings;
}
