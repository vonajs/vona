export * from '../model/layout.js';
export * from '../model/layoutContent.js';
export * from '../model/layoutFull.js';

import { ModelLayout } from '../model/layout.js';
import { ModelLayoutContent } from '../model/layoutContent.js';
import { ModelLayoutFull } from '../model/layoutFull.js';

export interface IModuleModel {
  layout: ModelLayout;
  layoutContent: ModelLayoutContent;
  layoutFull: ModelLayoutFull;
}
