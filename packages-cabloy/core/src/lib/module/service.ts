import { CabloyApplication } from '../../types/index.js';

const SERVICEPROXY = Symbol('CTX#__SERVICEPROXY');

export default function (app: CabloyApplication, modules) {
  // load services
  loadServices();

  // patch service
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      // maybe /favicon.ico
      if (context.module) {
        Object.defineProperty(context, 'service', {
          get() {
            let service = context[SERVICEPROXY];
            if (!service) {
              service = context[SERVICEPROXY] = new Proxy(
                {},
                {
                  get(obj, prop) {
                    if (typeof prop === 'symbol') return obj[prop];
                    const beanFullName = `${context.module.info.relativeName}.service.${prop}`;
                    return context.bean._getBean(beanFullName);
                  },
                },
              );
            }
            return service;
          },
        });
      }

      return context;
    };
  }

  function loadServices() {
    for (const key in modules) {
      const module = modules[key];
      const services = module.main.services;
      if (!services) continue;
      for (const serviceName in services) {
        const beanName = `service.${serviceName}`;
        const bean = {
          mode: 'app',
          bean: services[serviceName],
        };
        app.bean._register(module.info.relativeName, beanName, bean);
      }
    }
  }
}
