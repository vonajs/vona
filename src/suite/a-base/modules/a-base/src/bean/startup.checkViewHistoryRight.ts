import { BeanBase, IStartupExecute, Startup } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Startup({ instance: true, debounce: true, dependencies: 'a-base:checkResourceLocales' })
export class StartupCheckViewHistoryRight extends BeanBase<ScopeModule> implements IStartupExecute {
  get modelRoleRight() {
    return this.scope.model.roleRight;
  }

  async execute() {
    await this._checkAtomClasses();
  }

  async _checkAtomClasses() {
    const atomClasses = this.app.bean.base.atomClasses();
    for (const module in atomClasses) {
      const atomClassesModule = atomClasses[module];
      for (const atomClassName in atomClassesModule) {
        const atomClass = atomClassesModule[atomClassName];
        if (atomClass.history) {
          await this._checkAtomClass({
            atomClass: { module, atomClassName },
          });
        }
      }
    }
  }

  async _checkAtomClass({ atomClass }: any) {
    atomClass = await this.app.bean.atomClass.get(atomClass);
    // check if any role exists
    const right = await this.modelRoleRight.get({
      atomClassId: atomClass.id,
      action: 17, // viewHistory
    });
    if (right) return;
    // always add role of template.system when no records
    const roleRights = [
      { roleName: 'template.system', action: 'viewHistory', scopeNames: 'authenticated' }, //
      { roleName: 'authenticated', action: 'viewHistory', scopeNames: 0 }, //
    ];
    await this.app.bean.role.addRoleRightBatch({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      roleRights,
    });
  }
}
