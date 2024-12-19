import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 3) {
      // ref: a-baselayout
    }
  }

  async init(options) {
    if (options.version === 3) {
      // ref: a-baselayout
    }
    if (options.version === 4) {
      // ref: a-baselayout
    }
  }
}
