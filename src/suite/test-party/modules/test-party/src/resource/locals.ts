export * from '../local/test.js';

import { LocalTest } from '../local/test.js';

export interface IModuleService {
  test: LocalTest;
}
