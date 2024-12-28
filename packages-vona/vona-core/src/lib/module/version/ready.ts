import { cast, EnumAppEvent } from '../../../types/index.js';
import { BeanSimple } from '../../bean/beanSimple.js';

export class VersionReady extends BeanSimple {
  initialize() {}
  async execute() {
    const app = this.app;
    try {
      // version ready
      await cast(app.bean._getBean('a-startup.service.startup' as never)).versionReady();
      // record
      app.meta.__versionReady = true;
      // event: appReady
      app.emit(EnumAppEvent.AppReady);
      // event to agent
      app.meta.messenger.callAgent({
        name: 'appReady',
        data: { pid: process.pid },
      });
    } catch (err) {
      // record
      app.meta.__versionReadyError = err as Error;
      // event: appReadyError
      app.emit(EnumAppEvent.AppReadyError, err);
      // throw exception
      throw err;
    }
  }
}
