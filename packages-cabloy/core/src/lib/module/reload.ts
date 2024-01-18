import { BeanSimple } from './bean/beanSimple.js';

export class AppReload extends BeanSimple {
  now() {
    this.app.meta['a-cms:watcher'].reload({ action: 'now' });
  }
  freeze() {
    this.app.meta['a-cms:watcher'].reload({ action: 'freeze' });
  }
  unfreeze() {
    this.app.meta['a-cms:watcher'].reload({ action: 'unfreeze' });
  }
}
