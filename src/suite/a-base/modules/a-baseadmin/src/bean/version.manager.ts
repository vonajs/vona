import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'version' })
export class Version extends BeanBase {
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
