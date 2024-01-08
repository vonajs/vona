module.exports = class Local extends module.meta.class.BeanModuleBase {
  // magic
  __get__(prop) {
    return this.ctx.bean._getBean(this.moduleName, `local.${prop}`);
  }
};
