import type { IModuleMain } from 'vona';
import { BeanSimple } from 'vona';
import { errorsAdapter } from './lib/zod/errorsAdapter.ts';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    errorsAdapter(this.app);
  }

  async configLoaded(_config: any) {}
}
