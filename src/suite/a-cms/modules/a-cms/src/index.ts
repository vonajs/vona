import { BeanBase, IModule, IModuleMain } from '@cabloy/core';
import { Watcher } from './common/watcher.js';

export * from './config/index.js';
export * from './resource/index.js';
export * from './meta.js';
export * from './routes.js';
export * from './types.js';

export class Main extends BeanBase implements IModuleMain {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {
    // watcher: only in development
    if (this.app.meta.isLocal) {
      this.app.meta['a-cms:watcher'] = this.app.bean._newBean(Watcher);
    }
  }
  async configLoaded(_module: IModule, _config) {}
  async metaLoaded(_module: IModule, _meta) {}
}

import './typings.js';
