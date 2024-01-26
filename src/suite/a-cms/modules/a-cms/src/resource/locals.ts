export * from '../local/build.js';
export * from '../local/render.js';
export * from '../local/site.js';

import { LocalBuild } from '../local/build.js';
import { LocalRender } from '../local/render.js';
import { LocalSite } from '../local/site.js';

export interface IModuleLocal {
  build: LocalBuild;
  render: LocalRender;
  site: LocalSite;
}
