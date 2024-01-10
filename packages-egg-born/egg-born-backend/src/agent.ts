import { CabloyApplication, Bootstrap } from '@cabloy/core';

export default class AppBootHook {
  app: CabloyApplication;
  bootstrap: Bootstrap;

  constructor(app) {
    this.app = app;
    this.bootstrap = new Bootstrap(app);
  }

  async didLoad() {
    this.bootstrap.loadModules();
  }
}
