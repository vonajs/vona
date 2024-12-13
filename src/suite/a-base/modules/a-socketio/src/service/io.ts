import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceIo extends BeanBase {
  async subscribe({ path, timestamp, workerId, socketId, scene, user }: any) {
    return await this.app.bean.io.subscribe({ path, timestamp, workerId, socketId, scene, user });
  }

  async unsubscribe({ path, timestamp, socketId, user }: any) {
    return await this.app.bean.io.unsubscribe({ path, timestamp, socketId, user });
  }
}
