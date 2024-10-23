export * from '../local/resource.js';

import { LocalResource } from '../local/resource.js';

export interface IModuleService {
  resource: LocalResource;
}
