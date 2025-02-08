import { EnumAppEvent, VonaApplication } from '../../types/index.js';
import { extendApp } from '../core/app.js';
import { ModuleLoader } from '../module/loader.js';
import { SocketioReady } from '../module/socketio.js';

export class Bootstrap {
  app: VonaApplication;

  constructor(app: VonaApplication) {
    this.app = app;
  }

  async start() {
    const app = this.app;
    try {
      await this._start_appStart();
      await this._start_appReady();
      await this._start_appStarted();
    } catch (err) {
      // record
      app.meta.appStartError = err as Error;
      // event: appReadyError
      app.emit(EnumAppEvent.AppStartError, err);
      // throw exception
      throw err;
    }
  }

  async _start_appStart() {
    const app = this.app;
    // extendApp
    extendApp(app);
    // module loader
    const moduleLoader = app.bean._newBean(ModuleLoader);
    await moduleLoader.execute();
    // hook: appStart
    await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'appStart');
  }

  async _start_appReady() {
    const app = this.app;
    app.meta.appReady = true;
    app.meta.appReadyInstances = {};
    // todo: 在这里启动server listen，允许外部访问系统
    // hook: appReady
    await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'appReady');
  }

  async _start_appStarted() {
    const app = this.app;
    app.meta.appStarted = true;
    // event: appReady
    app.emit(EnumAppEvent.AppStarted);
    // hook: appStarted
    await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'appStarted');
  }

  async socketioReady() {
    const socketioReady = this.app.bean._newBean(SocketioReady);
    socketioReady.initialize();
  }
}
