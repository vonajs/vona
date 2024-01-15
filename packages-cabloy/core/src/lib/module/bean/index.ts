import { CabloyApplication } from '../../../type/index.js';
import { BeanContainerCreate, BeanContainerLike } from './beanContainer.js';

export function loadBeanContainer(app: CabloyApplication) {
  app.bean = BeanContainerCreate(app, null) as BeanContainerLike;
}

export function loadBeans(app: CabloyApplication) {
  // use modulesArray
  const ebModulesArray = app.meta.modulesArray;

  // all
  app.meta.aops = {};
  app.meta.beans = {};

  // load beans
  loadBeans();

  // load aops
  loadAops();

  // patch context
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      // not check context.module
      // bean
      context.bean = BeanContainerCreate(app, context);

      return context;
    };
  }

  function loadBeans() {
    for (const key in ebModulesArray) {
      const module = ebModulesArray[key];
      const beans = module.resource.beans;
      if (!beans) continue;
      for (const beanName in beans) {
        const moduleName = module.info.relativeName;
        const beanClass = beans[beanName];
        if (['app', 'ctx'].includes(beanClass.mode)) {
          throw new Error(`bean: ${moduleName}:${beanName}, mode: ${beanClass.mode} is deprecated, use Class instead.`);
        }
        app.bean._register(moduleName, beanName, beanClass);
      }
    }
  }

  function loadAops() {
    for (const key in ebModulesArray) {
      const module = ebModulesArray[key];
      const aops = module.resource.aops;
      if (!aops) continue;
      for (const aopName in aops) {
        app.bean._registerAop(module.info.relativeName, aopName, aops[aopName]);
      }
    }
  }
}
