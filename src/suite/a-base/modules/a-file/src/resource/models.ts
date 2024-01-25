export * from '../model/file.js';
export * from '../model/fileView.js';

import { ModelFile } from '../model/file.js';
import { ModelFileView } from '../model/fileView.js';

export interface IModuleModel {
  file: ModelFile;
  fileView: ModelFileView;
}
