export * from '../local/local.build.js';
export * from '../local/render.js';
export * from '../local/site.js';

import { LocalRender } from '../local/render.js';
import { LocalSite } from '../local/site.js';

export interface IModuleLocal {
  render: LocalRender;
  site: LocalSite;
}
