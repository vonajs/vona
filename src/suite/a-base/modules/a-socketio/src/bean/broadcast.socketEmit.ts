import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastSocketEmit extends BeanBase {
  async execute(context) {
    const data = context.data;
    this.app.bean.io.broadcastSocketEmit(data);
  }
}
