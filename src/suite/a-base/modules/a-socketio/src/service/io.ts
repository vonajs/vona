module.exports = class IO {
  async subscribe({ path, timestamp, workerId, socketId, scene, user }) {
    return await this.ctx.bean.io.subscribe({ path, timestamp, workerId, socketId, scene, user });
  }

  async unsubscribe({ path, timestamp, socketId, user }) {
    return await this.ctx.bean.io.unsubscribe({ path, timestamp, socketId, user });
  }
};
