import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'version' })
export class Version extends BeanBase {
  async update(options) {}

  async init(options) {}

  async test() {}
}
