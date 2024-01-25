module.exports = class AtomBase {
  get configModuleBase() {
    return this.ctx.config.module(moduleInfo.relativeName);
  }

  get modelResourceRole() {
    return this.ctx.model.module(moduleInfo.relativeName).resourceRole;
  }

  async submit({ atomClass, key, options, user }) {
    return await this.ctx.bean.atom._submitBase({ atomClass, key, options, user });
  }

  async enable({ /* atomClass,*/ key /* , options*/ /* , user*/ }) {
    // check demo
    this.ctx.bean.util.checkDemoForAtomEnable();
    // enable
    await this.ctx.bean.atom.modelAtom.update({
      id: key.atomId,
      atomDisabled: 0,
    });
  }

  async disable({ /* atomClass,*/ key /* , options*/ /* , user*/ }) {
    // check demo
    this.ctx.bean.util.checkDemoForAtomDisable();
    // disable
    await this.ctx.bean.atom.modelAtom.update({
      id: key.atomId,
      atomDisabled: 1,
    });
  }

  async copy(/* { atomClass, target, srcKey, srcItem, destKey, destItem, options, user }*/) {
    // do nothing
  }

  async importBulk(/* {  atomClass, options, file , user }*/) {
    // do nothing
  }

  async checkRightAction({ atom, atomClass, action, options, user }) {
    return await this.ctx.bean.atom._checkRightAction_base({ atom, atomClass, action, options, user });
  }

  async prepareStaticItem({ moduleName, atomClass, item, register }) {
    return await this.ctx.bean.atomStatic._adjustItem_base({ moduleName, atomClass, item, register });
  }
};
