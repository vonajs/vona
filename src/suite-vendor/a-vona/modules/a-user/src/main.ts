import type { IModuleMain } from 'vona';
import { BeanSimple } from 'vona';
import { ExtendKnex } from './lib/extendKnex.ts';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    ExtendKnex(this.app);
  }

  async configLoaded(_config: any) {}
}
