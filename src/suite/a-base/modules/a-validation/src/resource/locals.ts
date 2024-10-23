export * from '../local/validation.js';

import { LocalValidation } from '../local/validation.js';

export interface IModuleService {
  validation: LocalValidation;
}
