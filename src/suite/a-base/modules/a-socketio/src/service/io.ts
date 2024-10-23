import { BeanBase, Service } from 'vona';

@Service()
export class ServiceIo extends BeanBase {
  async subscribe({ path, timestamp, workerId, socketId, scene, user }: any) {
    return await this.ctx.bean.io.subscribe({ path, timestamp, workerId, socketId, scene, user });
  }

  async unsubscribe({ path, timestamp, socketId, user }: any) {
    return await this.ctx.bean.io.unsubscribe({ path, timestamp, socketId, user });
  }
}
