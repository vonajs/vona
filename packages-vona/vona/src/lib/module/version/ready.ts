import { EnumAppEvent } from '../../../types/index.js';
import { BeanSimple } from '../../bean/beanSimple.js';
import clearFn from './clear.js';

export class VersionReady extends BeanSimple {
  initialize() {}
  async execute() {
    const app = this.app;
    try {
      // version ready
      await _versionReady(app);
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

async function _versionReady(app) {
  // clear keys
  await clearFn(app);

  // run startups: not after
  for (const startup of app.meta.startupsArray) {
    if (!startup.config.disable && !startup.config.instance && startup.config.after !== true) {
      console.log(`---- startup: ${startup.key}, pid: ${process.pid}`);
      await app.meta._runStartup({ module: startup.module, name: startup.name });
    }
  }

  // appReady
  app.meta.appReady = true;
  app.meta.appReadyInstances = {};

  // run startups: after
  for (const startup of app.meta.startupsArray) {
    if (!startup.config.disable && !startup.config.instance && startup.config.after === true) {
      console.log(`---- startup: ${startup.key}, pid: ${process.pid}`);
      await app.meta._runStartup({ module: startup.module, name: startup.name });
    }
  }

  // version init
  if (app.meta.isTest || app.meta.isLocal) {
    // subdomain
    const subdomain = '';
    // init
    await app.meta.util.executeBean({
      subdomain,
      beanModule: 'a-instance',
      beanFullName: 'instance',
      args: subdomain,
      fn: 'instanceStartup',
    });
  }

  // version test
  if (app.meta.isTest) {
    // subdomain
    const subdomain = '';
    // test
    await app.meta.util.executeBean({
      subdomain,
      beanModule: 'a-version',
      beanFullName: 'a-version.service.version',
      context: subdomain,
      fn: '__instanceTest',
    });
  }
}
