import { BeanBase, Local } from 'vona';

@Local()
export class LocalIo extends BeanBase {
  async subscribe({ path, timestamp, workerId, socketId, scene, user }: any) {
    return await this.ctx.bean.io.subscribe({ path, timestamp, workerId, socketId, scene, user });
  }

  async unsubscribe({ path, timestamp, socketId, user }: any) {
    return await this.ctx.bean.io.unsubscribe({ path, timestamp, socketId, user });
  }
}
