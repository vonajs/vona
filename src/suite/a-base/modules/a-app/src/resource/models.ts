export * from '../model/app.js';
export * from '../model/appContent.js';
export * from '../model/appFull.js';

import { ModelApp } from '../model/app.js';
import { ModelAppContent } from '../model/appContent.js';
import { ModelAppFull } from '../model/appFull.js';

export interface IModuleModel {
  _app: ModelApp;
  appContent: ModelAppContent;
  appFull: ModelAppFull;
}
