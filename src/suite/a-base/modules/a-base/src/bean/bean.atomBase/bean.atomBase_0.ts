import { ScopeModule } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';

export class BeanAtomBase0 extends BeanBase<ScopeModule> {
  get configModuleBase() {
    return this.scope.config;
  }

  get modelResourceRole() {
    return this.scope.model.resourceRole;
  }

  async submit({ atomClass, key, options, user }: any) {
    return await this.ctx.bean.atom._submitBase({ atomClass, key, options, user });
  }

  async enable({ /* atomClass,*/ key /* , options*/ /* , user*/ }: any) {
    // check demo
    this.ctx.bean.util.checkDemoForAtomEnable();
    // enable
    await this.ctx.bean.atom.modelAtom.update({
      id: key.atomId,
      atomDisabled: 0,
    });
  }

  async disable({ /* atomClass,*/ key /* , options*/ /* , user*/ }: any) {
    // check demo
    this.ctx.bean.util.checkDemoForAtomDisable();
    // disable
    await this.ctx.bean.atom.modelAtom.update({
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
    return await this.ctx.bean.atom._checkRightAction_base({ atom, atomClass, action, options, user });
  }

  async prepareStaticItem({ moduleName, atomClass, item, register }: any) {
    return await this.ctx.bean.atomStatic._adjustItem_base({ moduleName, atomClass, item, register });
  }
}
