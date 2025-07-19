import type { IModuleMain } from 'vona';
import { BeanSimple } from 'vona';
import { errorsAdapter } from './lib/zod/errorsAdapter.ts';
import { schemaRefCustomAdapter } from './lib/zod/schemaRefCustomAdapter.ts';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    errorsAdapter(this.app);
    schemaRefCustomAdapter(this.app);
  }

  async configLoaded(_config: any) {}
}
