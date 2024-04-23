import { BeanSimple, IModuleMain } from '@cabloy/core';
import { ExtendKnex } from './extend/index.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {
    ExtendKnex(this.app);
  }
  async moduleLoaded() {}
  async configLoaded(_config) {}
  async metaLoaded(_meta) {}
}
