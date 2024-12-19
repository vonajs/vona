import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

const fileVersionUpdates = [
  //
  1, 2, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14,
  //
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  //
  26, 27, 28, 29, 30,
];
const fileVersionInits = [2, 4, 5, 7, 8, 9, 14, 15, 26, 29];

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
