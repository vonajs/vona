module.exports = class Local extends module.meta.class.BeanModuleBase {
  // magic
  __get__(prop) {
    const bean = this.ctx ? this.ctx.bean : this.app.bean;
    return bean._getBean(`${this.moduleScope}.local.${prop}`);
  }
};
