import { CabloyApplication } from '../../types/index.js';
import LoadModulesFn from '../module';
import { VersionReady } from '../module/version/ready.js';

export class Bootstrap {
  app: CabloyApplication;

  constructor(app) {
    this.app = app;
  }

  loadModules() {
    LoadModulesFn(this);
  }

  async versionReady() {
    const app = this.app as any;
    const versionReady = app.bean._newBean(VersionReady);
    await versionReady.execute();
  }
}
