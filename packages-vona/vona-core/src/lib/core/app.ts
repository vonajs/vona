import { VonaApplication } from '../../types/application/app.js';
import { BeanContainer } from '../bean/beanContainer.js';
import appClose from './appClose.js';
import { contextBase } from './context.js';

export function extendApp(app: VonaApplication) {
  // app.ctx
  Object.defineProperty(app, 'ctx', {
    enumerable: false,
    configurable: true,
    get() {
      return app.currentContext;
    },
  });
  // app.bean
  app.bean = BeanContainer.create(app, undefined);
  // app.context
  for (const key of Reflect.ownKeys(contextBase)) {
    const desc = Object.getOwnPropertyDescriptor(contextBase, key)!;
    Object.defineProperty(app.context, key, desc);
  }
  // app close
  appClose(app);
}
