export * from '../local/sequence.js';

import { LocalSequence } from '../local/sequence.js';

export interface IModuleService {
  sequence: LocalSequence;
}
