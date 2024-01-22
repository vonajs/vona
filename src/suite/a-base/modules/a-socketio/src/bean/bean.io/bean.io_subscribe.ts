// const moduleInfo = module.info;
module.exports = class IO {
  // subcribe
  //    key: userId:path:socketId
  //    value: timestamp,workerId,scene
  async subscribe({ path, timestamp, workerId, socketId, scene, user }) {
    return await this.localRedis._subscribe({ path, timestamp, workerId, socketId, scene, user });
  }

  async unsubscribe({ path, timestamp, socketId, user }) {
    return await this.localRedis._unsubscribe({ path, timestamp, socketId, user });
  }

  async unsubscribeWhenDisconnect({ iid, user, socketId }) {
    return await this.localRedis._unsubscribeWhenDisconnect({ iid, user, socketId });
  }
};
