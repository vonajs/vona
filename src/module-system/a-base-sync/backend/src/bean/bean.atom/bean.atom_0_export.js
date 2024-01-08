const mparse = require('@cabloy/module-parse').default;

// const moduleInfo = module.info;
module.exports = class Atom {
  async exportBulk({ atomClass, options, fields, user }) {
    // atomClass
    let atomClassBase;
    if (atomClass) {
      atomClass = await this.ctx.bean.atomClass.get(atomClass);
      atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    }
    // export
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    const resExport = await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, options, fields, user },
      fn: 'exportBulk',
    });
    // file
    const resFile = await this.ctx.bean.file._upload({
      fileContent: resExport.data,
      meta: resExport.meta,
      user,
    });
    // ok
    return resFile;
  }
};
