import { BeanBase, IModuleMain } from '@cabloy/core';
import { Watcher } from './common/watcher.js';

export * from './config/index.js';
export * from './resource/index.js';
export * from './meta.js';
export * from './routes.js';

import './typings/core/index.js';

export class Main extends BeanBase implements IModuleMain {
  async moduleLoading(_options): Promise<void> {}
  async moduleLoaded(_options): Promise<void> {
    // watcher: only in development
    if (this.app.meta.isLocal) {
      this.app.meta['a-cms:watcher'] = this.app.bean._newBean(Watcher);
    }
  }
  async configLoaded(_options): Promise<void> {}
  async metaLoaded(_options): Promise<void> {}
}
