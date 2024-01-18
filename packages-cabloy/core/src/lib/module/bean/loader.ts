import { CabloyApplication } from '../../../type/index.js';
import { BeanContainerCreate, BeanContainerLike } from './beanContainer.js';

export function loadBeanContainer(app: CabloyApplication) {
  app.bean = BeanContainerCreate(app, null) as BeanContainerLike;
}

export function loadBeans(app: CabloyApplication) {
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
}
