import { VonaApplication } from '../../types/index.js';
import { extendApp } from '../core/app.js';
import { ModuleLoader } from '../module/loader.js';
import { SocketioReady } from '../module/socketio.js';
import { VersionReady } from '../module/version/ready.js';

export class Bootstrap {
  app: VonaApplication;

  constructor(app: VonaApplication) {
    this.app = app;
  }

  async loadModules() {
    // extendApp
    extendApp(this.app);
    // module loader
    const moduleLoader = this.app.bean._newBean(ModuleLoader);
    await moduleLoader.execute();
  }

  async versionReady() {
    const versionReady = this.app.bean._newBean(VersionReady);
    await versionReady.execute();
  }

  async socketioReady() {
    const socketioReady = this.app.bean._newBean(SocketioReady);
    socketioReady.initialize();
  }
}
