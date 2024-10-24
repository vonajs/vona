import { VonaApplication } from '../../../types/index.js';
import { BeanContainer } from '../../bean/beanContainer.js';

export function loadBeanContainer(app: VonaApplication) {
  app.bean = BeanContainer.create(app, null);
}

export function loadBeans(app: VonaApplication) {
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
