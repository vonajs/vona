import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

const fileVersionUpdates = [1];
const fileVersionInits = [1];

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (fileVersionUpdates.includes(options.version)) {
      const { VersionUpdate } = await import(`./version.manager/update/update${options.version}.js`);
      const versionUpdate = this.app.bean._newBean(VersionUpdate);
      await versionUpdate.run(options);
    }
  }

  async init(options) {
    if (fileVersionInits.includes(options.version)) {
      const { VersionInit } = await import(`./version.manager/init/init${options.version}.js`);
      const versionInit = this.app.bean._newBean(VersionInit);
      await versionInit.run(options);
    }
  }

  async test() {
    const { VersionTest } = await import('./version.manager/test/test.js');
    const versionTest = this.app.bean._newBean(VersionTest);
    await versionTest.run();
  }
}
