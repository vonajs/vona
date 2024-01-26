export * from '../bean/version.manager.js';
export * from '../bean/bean.settings.js';

import { BeanSettings } from '../bean/bean.settings.js';

export interface IBeanRecord {
  settings: BeanSettings;
}
