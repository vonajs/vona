import { IInstanceStartupOptions, VonaApplication, cast } from '../../index.js';

export default function (app: VonaApplication) {
  app.meta._runStartupInstance = async (subdomain: string, options?: IInstanceStartupOptions) => {
    // run startups: not after
    for (const startup of app.meta.startupsArray) {
      if (!startup.config.disable && startup.config.instance && startup.config.after !== true) {
        console.log(`---- instance startup: ${startup.key}, pid: ${process.pid}`);
        await app.meta._runStartup(startup.module, startup.name, subdomain, options);
      }
    }
    // set flag
    app.meta.appReadyInstances[subdomain] = true;
    // run startups: after
    for (const startup of app.meta.startupsArray) {
      if (!startup.config.disable && startup.config.instance && startup.config.after === true) {
        console.log(`---- instance startup: ${startup.key}, pid: ${process.pid}`);
        await app.meta._runStartup(startup.module, startup.name, subdomain, options);
      }
    }
    // load queue workers
    if (!app.meta.isTest) {
      app.meta._loadQueueWorkers({ subdomain });
    }
  };
}
