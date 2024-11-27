import { BeanBase, cast } from 'vona';
import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomBase } from '../bean.atomBase.js';

export class BeanAtomBase0 extends BeanBase {
  protected get self() {
    return cast<BeanAtomBase>(this);
  }

  get scopeModuleABase() {
    return this.getScope(__ThisModule__);
  }

  get configModuleBase() {
    return this.scopeModuleABase.config;
  }

  get modelResourceRole() {
    return this.scopeModuleABase.model.resourceRole;
  }

  async submit({ atomClass, key, options, user }: any) {
    return await this.app.bean.atom._submitBase({ atomClass, key, options, user });
  }

  async enable({ /* atomClass,*/ key /* , options*/ /* , user*/ }: any) {
    // check demo
    this.app.bean.util.checkDemoForAtomEnable();
    // enable
    await this.app.bean.atom.modelAtom.update({
      id: key.atomId,
      atomDisabled: 0,
    });
  }

  async disable({ /* atomClass,*/ key /* , options*/ /* , user*/ }: any) {
    // check demo
    this.app.bean.util.checkDemoForAtomDisable();
    // disable
    await this.app.bean.atom.modelAtom.update({
      id: key.atomId,
      atomDisabled: 1,
    });
  }

  async copy(_params: { atomClass; target; srcKey; srcItem; destKey; destItem; options; user }) {
    // do nothing
  }

  async importBulk(/* {  atomClass, options, file , user }*/ _params: any) {
    // do nothing
  }

  async checkRightAction({ atom, atomClass, action, options, user }: any) {
    return await this.app.bean.atom._checkRightAction_base({ atom, atomClass, action, options, user });
  }

  async prepareStaticItem({ moduleName, atomClass, item, register }: any) {
    return await this.app.bean.atomStatic._adjustItem_base({ moduleName, atomClass, item, register });
  }
}
