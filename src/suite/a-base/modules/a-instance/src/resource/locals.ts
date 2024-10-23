export * from '../local/instance.js';

import { LocalInstance } from '../local/instance.js';

export interface IModuleService {
  instance: LocalInstance;
}
