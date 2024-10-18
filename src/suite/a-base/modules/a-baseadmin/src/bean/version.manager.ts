import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // empty
    }
  }

  async init(options) {
    if (options.version === 1) {
      // empty
    }

    if (options.version === 2) {
      // empty
    }

    if (options.version === 3) {
      // empty
    }
  }
}
