import { CabloyContext, Cast } from '../../index.js';

export default function (app) {
  // use modulesArray
  const ebModulesArray = app.meta.modulesArray;

  // all startups
  const ebStartups = (app.meta.startups = {});
  const ebStartupsArray: any[] = (app.meta.startupsArray = []);

  // load startups
  loadStartups();

  function loadStartups() {
    for (const module of ebModulesArray) {
      const config = app.meta.configs[module.info.relativeName];
      if (!config.startups) continue;
      for (const startupKey in config.startups) {
        const startupConfig = config.startups[startupKey];
        const fullKey = `${module.info.relativeName}:${startupKey}`;
        // bean
        const beanName = startupConfig.bean;
        if (!beanName) throw new Error(`bean not set for startup: ${fullKey}`);
        let bean;
        if (typeof beanName === 'string') {
          bean = {
            module: module.info.relativeName,
            name: beanName,
          };
        } else {
          bean = {
            module: beanName.module || module.info.relativeName,
            name: beanName.name,
          };
        }
        ebStartups[fullKey] = {
          key: fullKey,
          module: module.info.relativeName,
          name: startupKey,
          config: startupConfig,
          bean,
        };
        ebStartupsArray.push(ebStartups[fullKey]);
      }
    }
  }

  app.meta._runStartup = async ({ module, name, instanceStartup }) => {
    const fullKey = `${module}:${name}`;
    const startup = ebStartups[fullKey];
    // normal
    if (!startup.config.debounce) {
      return await _runStartupInner({ startup, instanceStartup });
    }
    // debounce: lock
    const subdomain = instanceStartup ? instanceStartup.subdomain : undefined;
    return await app.meta.util.lock({
      subdomain,
      resource: `${instanceStartup ? 'instanceStartup' : 'startup'}.${fullKey}`,
      fn: async () => {
        return await app.meta.util.executeBean({
          subdomain,
          beanModule: 'a-base',
          fn: async ({ ctx }) => {
            await _runStartupLock({ ctx, startup, instanceStartup });
          },
        });
      },
    });
  };

  app.meta._runStartupInstance = async ({ subdomain, options }) => {
    // run startups: not after
    for (const startup of app.meta.startupsArray) {
      if (!startup.config.disable && startup.config.instance && startup.config.after !== true) {
        console.log(`---- instance startup: ${startup.key}, pid: ${process.pid}`);
        await app.meta._runStartup({
          module: startup.module,
          name: startup.name,
          instanceStartup: { subdomain, options },
        });
      }
    }
    // set flag
    app.meta.appReadyInstances[subdomain] = true;
    // run startups: after
    for (const startup of app.meta.startupsArray) {
      if (!startup.config.disable && startup.config.instance && startup.config.after === true) {
        console.log(`---- instance startup: ${startup.key}, pid: ${process.pid}`);
        await app.meta._runStartup({
          module: startup.module,
          name: startup.name,
          instanceStartup: { subdomain, options },
        });
      }
    }
    // load queue workers
    if (!app.meta.isTest) {
      app.meta._loadQueueWorkers({ subdomain });
    }
  };

  async function _runStartupLock({
    ctx,
    startup,
    instanceStartup,
  }: {
    ctx: CabloyContext;
    startup?;
    instanceStartup?;
  }) {
    // ignore debounce for test
    const force = instanceStartup && instanceStartup.options && instanceStartup.options.force;
    if (!force && !ctx.app.meta.isTest) {
      const fullKey = `${startup.module}:${startup.name}`;
      const cacheKey = `startupDebounce:${fullKey}${instanceStartup ? `:${ctx.instance.id}` : ''}`;
      const debounce =
        typeof startup.config.debounce === 'number' ? startup.config.debounce : ctx.app.config.queue.startup.debounce;
      const cache = Cast(ctx.bean).cacheRedis.module('a-base');
      const flag = await cache.getset(cacheKey, true, debounce);
      if (flag) return;
    }
    // perform
    await _runStartupInner({ startup, instanceStartup });
  }

  async function _runStartupInner({ startup, instanceStartup }) {
    // context
    const context = {
      options: instanceStartup ? instanceStartup.options : undefined,
    };
    // bean
    const bean = startup.bean;
    // execute
    return await app.meta.util.executeBean({
      subdomain: instanceStartup ? instanceStartup.subdomain : undefined,
      context,
      beanModule: bean.module,
      beanFullName: `${bean.module}.startup.${bean.name}`,
      transaction: startup.config.transaction,
    });
  }
}
