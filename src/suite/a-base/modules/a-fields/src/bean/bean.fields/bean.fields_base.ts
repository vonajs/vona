module.exports = class Fields {
  get modelRoleFieldsRight() {
    return this.ctx.model.module('a-base').roleFieldsRight;
  }
};
