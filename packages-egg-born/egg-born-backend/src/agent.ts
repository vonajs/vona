import type { VonaApplication } from 'vona';
import { Bootstrap } from 'vona';

export default class AppBootHook {
  app: VonaApplication;
  bootstrap: Bootstrap;

  constructor(app) {
    this.app = app;
    this.bootstrap = new Bootstrap(app);
  }

  async didLoad() {}
}
