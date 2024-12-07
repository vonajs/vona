import { BeanBase, IStartupExecute, Startup } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Startup({ instance: true, debounce: true })
export class StartupRegisterAllWatchers extends BeanBase<ScopeModule> implements IStartupExecute {
  async execute() {
    // only in development
    if (!this.app.meta.isLocal) return;
    await this._registerCms();
  }

  async _registerCms() {
    // config
    const configWatchAtomClass = this.scope.config.watch.atomClass;
    // loop modules
    for (const module of this.app.meta.modulesArray) {
      // loop atomClasses
      const atoms = this.app.bean.util.getProperty(module, 'main.meta.base.atoms');
      if (!atoms) continue;
      for (const key in atoms) {
        if (atoms[key].info.cms !== true) continue;
        // atomClass
        const atomClass = {
          module: module.info.relativeName,
          atomClassName: key,
        };
        // check if watch
        if (this.app.bean.util.checkIfSameAtomClass(configWatchAtomClass, atomClass)) {
          const build = this.app.bean.cms.build({ atomClass });
          await build.registerWatchers();
        }
      }
    }
  }
}
