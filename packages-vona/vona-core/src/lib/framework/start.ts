import type { VonaApplication } from '../core/application.ts';
import { EnumAppEvent } from '../../types/index.ts';
import { ModuleLoader } from '../module/loader.ts';

export class Start {
  app: VonaApplication;

  constructor(app: VonaApplication) {
    this.app = app;
  }

  async start() {
    const app = this.app;
    try {
      await this._start_appLoad();
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

  async _start_appLoad() {
    const app = this.app;
    // module loader
    const moduleLoader = app.bean._newBean(ModuleLoader);
    await moduleLoader.execute();
  }

  async _start_appStart() {
    const app = this.app;
    // hook: appStart
    await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'appStart');
  }

  async _start_appReady() {
    const app = this.app;
    app.meta.appReady = true;
    app.meta.appReadyInstances = {};
    // hook: appReady
    await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'appReady');
  }

  async _start_appStarted() {
    const app = this.app;
    app.meta.appStarted = true;
    // event: appStarted
    app.emit(EnumAppEvent.AppStarted);
    // hook: appStarted
    await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'appStarted');
  }
}
