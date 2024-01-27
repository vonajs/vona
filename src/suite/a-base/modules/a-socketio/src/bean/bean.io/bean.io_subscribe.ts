import { BeanIoSockets } from './bean.io_sockets.js';

export class BeanIoSubscribe extends BeanIoSockets {
  // subcribe
  //    key: userId:path:socketId
  //    value: timestamp,workerId,scene
  async subscribe({ path, timestamp, workerId, socketId, scene, user }: any) {
    return await this.localRedis._subscribe({ path, timestamp, workerId, socketId, scene, user });
  }

  async unsubscribe({ path, timestamp, socketId, user }: any) {
    return await this.localRedis._unsubscribe({ path, timestamp, socketId, user });
  }

  async unsubscribeWhenDisconnect({ iid, user, socketId }: any) {
    return await this.localRedis._unsubscribeWhenDisconnect({ iid, user, socketId });
  }
}
