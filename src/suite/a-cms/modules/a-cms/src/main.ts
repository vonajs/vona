import { BeanSimple, IModuleMain } from '@cabloy/core';
import { Watcher } from './common/watcher.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    // watcher: only in development
    if (this.app.meta.isLocal) {
      this.app.meta['a-cms:watcher'] = this.app.bean._newBean(Watcher);
    }
  }
  async configLoaded(_config) {}
  async metaLoaded(_meta) {}
}
