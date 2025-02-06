import { EnumAppEvent, VonaApplication } from '../../types/index.js';
import { extendApp } from '../core/app.js';
import { ModuleLoader } from '../module/loader.js';
import { SocketioReady } from '../module/socketio.js';
import { VersionReady } from '../module/version/ready.js';

export class Bootstrap {
  app: VonaApplication;

  constructor(app: VonaApplication) {
    this.app = app;
  }

  async start() {
    const app = this.app;
    try {
      // extendApp
      extendApp(this.app);
      // module loader
      const moduleLoader = this.app.bean._newBean(ModuleLoader);
      await moduleLoader.execute();
      // appStart/appReady/appStarted
      // started
      app.meta.__appStarted = true;
      // event: appReady
      app.emit(EnumAppEvent.AppStarted);
      // event to agent
      // todo: remove
      app.meta.messenger.callAgent({
        name: 'appReady',
        data: { pid: process.pid },
      });
    } catch (err) {
      // record
      app.meta.__appStartError = err as Error;
      // event: appReadyError
      app.emit(EnumAppEvent.AppStartError, err);
      // throw exception
      throw err;
    }
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
