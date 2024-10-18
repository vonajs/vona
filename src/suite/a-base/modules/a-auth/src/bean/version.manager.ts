import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // aAuthProvider: add scenes
      await this.bean.model.alterTable('aAuthProvider', function (table) {
        table.json('scenes');
      });

      // aAuth: add providerScene
      await this.bean.model.alterTable('aAuth', function (table) {
        table.string('providerScene', 255);
      });
    }
  }

  async init() {}

  async test() {}
}
