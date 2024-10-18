import { CabloyApplication } from '../../../types/index.js';
import { BeanContainer } from '../../bean/beanContainer.js';

export function loadBeanContainer(app: CabloyApplication) {
  app.bean = BeanContainer.create(app, null);
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
      context.bean = BeanContainer.create(app, context);

      return context;
    };
  }
}
