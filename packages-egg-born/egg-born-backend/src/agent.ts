import { CabloyApplication, Bootstrap } from "vona";

export default class AppBootHook {
  app: CabloyApplication;
  bootstrap: Bootstrap;

  constructor(app) {
    this.app = app;
    this.bootstrap = new Bootstrap(app);
  }

  async didLoad() {
    await this.bootstrap.loadModules();
  }
}
