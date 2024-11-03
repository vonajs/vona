import { BeanSimple, IModuleMain } from 'vona';
import { ExtendKnex } from './extend/index.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {
    ExtendKnex(this.app);
  }
  async moduleLoaded() {}
  async configLoaded(_config) {}
}
