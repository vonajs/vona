export * from '../local/file.js';

import { LocalFile } from '../local/file.js';

export interface IModuleService {
  file: LocalFile;
}
