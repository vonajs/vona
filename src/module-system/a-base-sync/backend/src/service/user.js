module.exports = class User {
  async getLabels({ user }) {
    return await this.ctx.bean.atom.getLabels({ user });
  }

  async setLabels({ labels, user }) {
    return await this.ctx.bean.atom.setLabels({ labels, user });
  }
};
