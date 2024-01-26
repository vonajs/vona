import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupRegisterDevelopment extends BeanBase {
  async execute() {
    // only in development
    if (!this.app.meta.isLocal) return;
    await this._registerDevelopment();
  }

  async _registerDevelopment() {
    // info
    const watcherInfo = { development: true, watchers: null };
    // register
    this.app.meta['a-cms:watcher'].register(watcherInfo);
  }
}
