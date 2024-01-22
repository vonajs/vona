module.exports = class SummerCache {
  async get(key) {
    return await this.ctx.bean.atomRightAux.__getRoleScopesOfRoleRaw(key);
  }
};
