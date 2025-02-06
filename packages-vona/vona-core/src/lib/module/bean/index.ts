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
