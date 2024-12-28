import { VonaApplication } from '../../../types/index.js';
import { BeanContainer } from '../../bean/beanContainer.js';

export function loadBeanContainer(app: VonaApplication) {
  Object.defineProperty(app, 'ctx', {
    enumerable: false,
    configurable: true,
    get() {
      return app.currentContext;
    },
  });
  app.bean = BeanContainer.create(app, undefined);
}

export function loadBeans(app: VonaApplication) {
  // patch context
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      // bean
      context.bean = BeanContainer.create(app, context);

      return context;
    };
  }
}
