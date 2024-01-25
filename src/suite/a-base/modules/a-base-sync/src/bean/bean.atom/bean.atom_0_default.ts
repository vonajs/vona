const mparse = require('@cabloy/module-parse').default;

module.exports = class Atom {
  async default({ atomClass, atomStage, roleIdOwner, item, options, user }) {
    options = options || {};
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // atomSimple
    const atomSimple = Number(Boolean(atomClassBase.simple));
    // item
    item = item || {};
    if (!atomClassBase.itemOnly) {
      item.atomStage = atomStage !== undefined ? atomStage : atomSimple;
      item.roleIdOwner = roleIdOwner;
    }
    // atom bean
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    item = await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, item, options, user },
      fn: 'default',
    });
    // ok
    const returnSchema = options.returnSchema;
    if (!returnSchema) return item;
    return { item, schema: options.schema };
  }
};
