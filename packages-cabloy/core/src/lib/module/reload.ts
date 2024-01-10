import { BeanBase } from './bean/beanBase.js';

export class AppReload extends BeanBase {
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
