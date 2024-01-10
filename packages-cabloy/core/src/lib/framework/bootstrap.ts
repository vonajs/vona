import { CabloyApplication } from '../../types/index.js';
import { loadBeanContainer } from '../module/bean/index.js';
import { ModuleLoader } from '../module/index.js';
import { VersionReady } from '../module/version/ready.js';

export class Bootstrap {
  app: CabloyApplication;

  constructor(app) {
    this.app = app;
  }

  async loadModules() {
    const app = this.app as any;
    // bean container
    loadBeanContainer(app);
    // module loader
    const moduleLoader = app.bean._newBean(ModuleLoader);
    await moduleLoader.execute();
  }

  async versionReady() {
    const app = this.app as any;
    const versionReady = app.bean._newBean(VersionReady);
    await versionReady.execute();
  }
}
