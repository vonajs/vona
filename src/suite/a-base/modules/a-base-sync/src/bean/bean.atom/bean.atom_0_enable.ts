const mparse = require('@cabloy/module-parse').default;

// const moduleInfo = module.info;
module.exports = class Atom {
  async enable({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }) {
    // atomClass
    const { key, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    // atom bean
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, key, options, user },
      fn: 'enable',
    });
  }

  async disable({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }) {
    // atomClass
    const { key, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    // atom bean
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, key, options, user },
      fn: 'disable',
    });
  }
};
