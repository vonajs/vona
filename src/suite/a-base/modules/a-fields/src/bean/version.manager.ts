import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(_options) {}

  async init(_options) {}

  async test() {}
}
