const mparse = require('@cabloy/module-parse').default;

module.exports = class Atom {
  async importBulk({ atomClass, options, file, user }) {
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // importBulk
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    return await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, options, file, user },
      fn: 'importBulk',
    });
  }
};
